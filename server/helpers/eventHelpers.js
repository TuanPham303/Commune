"use strict";


//Creating helper functions to bridge data to the website
module.exports = function makeEventHelpers(knex, googleMapsClient) {

  function postReview(reviewerId, eventId, userId, rating, description) {
    return knex('user_events')
      .select('id')
      .where({
        user_id: userId,
        event_id: eventId
      })
      .then((userEvent) => {
        return knex('reviews')
        .insert({
          reviewer_id: reviewerId,
          user_event_id: userEvent[0].id,
          rating: rating,
          description: description
        });
      });
    
  }

  // returns event info and host/chef info for all or a particular event
  // for a particular event, pass in the event id, for all events pass in number 0
  function queryDB(eventID) {
    let compare;
    !eventID ? compare = '>' : compare = '=';
    return new Promise((resolve, reject) => {
      knex('events')
        .join('user_events', 'user_events.event_id', '=', 'events.id')
        .join('user_event_roles', 'user_event_roles.user_event_id', '=', 'user_events.id')
        .join('roles', 'roles.id', '=', 'user_event_roles.role_id')
        .join('users', 'users.id', '=', 'user_events.user_id')
        .distinct('events.id')
        .select('user_events.event_id', 'events.title', 'events.neighbourhood', 'events.event_date',
                'events.description', 'events.menu_description', 'events.price', 'events.image_url',
                'events.capacity', 'user_events.user_id', 'roles.role_name', 'users.first_name', 'users.last_name')
        .where('events.id', compare, eventID)
        .whereIn('role_name', ['host', 'chef'])
        .then(results => {
          resolve(results);
        });
    });
  }

  // helper function for normalized array
  function isInNormalizedArray(element) {
    return element >= 15;
  }

  // removes dupliacate event info when an event has multiple hosts/chefs
  // accepts data in an array as formatted by queryDB
  function normalizeData(data) {
    return new Promise((resolve, reject) => {
      const normalizedArray = []
      new Promise((resolve, reject) => {
        data.forEach((item) => {
          const arrIndex = normalizedArray.findIndex(x => x.event_id === item.event_id);
          if (arrIndex === -1) {
            const newEventObj = {
              event_id: item.event_id,
              title: item.title,
              neighbourhood: item.neighbourhood,
              event_date: item.event_date,
              description: item.description,
              menu_description: item.menu_description,
              price: item.price,
              image_url: item.image_url,
              capacity: item.capacity,
              hosts_and_chefs: [
                {
                  user_id: item.user_id,
                  role_name: item.role_name,
                  first_name: item.first_name,
                  last_name: item.last_name
                }
              ]
            };
            normalizedArray.push(newEventObj);
          } else {
            const newUserObj = {
              user_id: item.user_id,
              role_name: item.role_name,
              first_name: item.first_name,
              last_name: item.last_name
            };
            normalizedArray[arrIndex].hosts_and_chefs.push(newUserObj);
          };
        });
        resolve();
      });
      resolve(normalizedArray);
    });
  }

  // helper functions for getLocationDetals
  function findNeighborhood(data) {
    return data.types[0] === 'neighborhood';
  }

  function findLocality(data) {
    return data.types[0] === 'locality';
  }

  function getAreaString(data) {
    if (data.find(findNeighborhood)) {
      return data.find(findNeighborhood).long_name + ', ' + data.find(findLocality).long_name;
    } else {
      return data.find(findLocality).long_name;
    }
  }

  // makes an api call to google places api to determine neighbourhood, lat/long & formatted address
  function getLocationDetails(eventID, address) {
    return googleMapsClient.geocode({
      address: address
    })
      .asPromise()
      .then((response) => {
        const results = response.json.results[0];
        const locale = results.geometry.location;
        knex('events')
          .where('id', eventID)
          .update({
            location: knex.raw('point(?, ?)', [locale.lat, locale.lng]),
            address: results.formatted_address,
            neighbourhood: getAreaString(results.address_components)
          })
      })
      .catch((err) => {
        // if the api request fails, wait 30 sec then try again
        console.log('Google Places API error: ', err);
        setTimeout(getLocationDetails, 30000, eventID, address);
      });
  }

  // creates an event and calls getLocationDetails()
  function createEvent(details) {
    return new Promise((resolve, reject) => {
      knex
        .insert({
          title: details.title, //required
          address: details.address, //required
          event_date: details.date,
          description: details.description,
          menu_description: details.menu,
          price: details.price, //required
          capacity: details.capacity, //required
          image_url: details.image
        })
        .into('events')
        .returning('id')
        .then((id) => {
          new Promise((resolve, reject) => {
            details.users.forEach((user) => {
              addUserToEvent(user.user, Number(id), user.role);
            });
            resolve();
          })
          .then(() => {
            getLocationDetails(Number(id), details.address)
            resolve();
          });
        });
    });
  }

  // returns true or false if a user has booked an event
  function userIsBooked(userID, eventID) {
    return new Promise((resolve, reject) => {
      knex('user_events')
        .where('user_id', userID)
        .andWhere('event_id', eventID)
        .then(results => {
          if (results.length === 0) {
            resolve(false);
          } else {
            resolve(true);
          }
        });
    });
  }

  // returns true or false if event has spaces
  function eventHasSpace(eventID) {
    return new Promise((resolve, reject) => {
      knex('user_events')
        .join('events', 'user_events.event_id', '=', 'events.id')
        .select(knex.raw('count(*) as usersCount, capacity'))
        .where('event_id', 10000)
        .groupBy('capacity')
        .then(results => {
          resolve(results[0].capacity > results[0].userscount);
        });
    });
  }

  // adds user to event and adds user role
  function addUserToEvent(userID, eventID, roleID) {
    return new Promise((resolve, reject) => {
      knex
        .insert({
          user_id: userID,
          event_id: eventID
        })
        .into('user_events')
        .returning('id')
        .then((id) => {
          knex
            .insert({
              user_event_id: Number(id),
              role_id: roleID
            })
            .into('user_event_roles')
            .then(() => {
              resolve();
            });
        });
    });
  }

  function getReviewsByEvent(eventId) {
    return knex('reviews')
    .select('users.first_name', 'users.last_name', 'reviews.rating', 'reviews.description')
    .join('user_events', 'user_events.id', 'reviews.user_event_id')
    .join('events', 'events.id', 'user_events.event_id')
    .join('users', 'users.id', 'reviews.reviewer_id')
    .where('events.id', eventId)
    .then((result) => result);
  }

  return {
    queryDB,
    postReview,
    normalizeData,
    getLocationDetails,
    createEvent,
    userIsBooked,
    eventHasSpace,
    addUserToEvent,
    getReviewsByEvent
  };
};
