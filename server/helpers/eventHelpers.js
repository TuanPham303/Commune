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
        .distinct('events.id')                                                        //is this really necessary?
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

  // helper function for normalizeData
  function createUserObject(userData) {
    return (({user_id, role_name, first_name, last_name}) =>
            ({user_id, role_name, first_name, last_name}))(userData);
  }

  // removes dupliacate event info when an event has multiple hosts/chefs
  // accepts data in an array as formatted by queryDB
  function normalizeData(data) {
    return new Promise((resolve, reject) => {
      const normalizedArray = []
      new Promise((resolve, reject) => {
        data.forEach((item) => {
          const arrIndex = normalizedArray.findIndex(x => x.event_id === item.event_id);
          if (arrIndex === -1) { // if event isnt in normalizedArray, reformat host/chef data and add entire event
            let newEventObj = Object.assign({}, item);
            ['user_id', 'role_name', 'first_name', 'last_name'].forEach(i => delete newEventObj[i]);
            if (!newEventObj.image) {
              newEventObj.image = '/event_default.jpg';
            }
            newEventObj.hosts_and_chefs = [createUserObject(item)];
            normalizedArray.push(newEventObj);
          } else { // if event is in normalizedArray, reformat and add only host and chef data
            const newUserObj = createUserObject(item);
            normalizedArray[arrIndex].hosts_and_chefs.push(newUserObj);
          };
        });
        resolve();
      });
      resolve(normalizedArray);
    });
  }

  // 3 helper functions for getLocationDetals
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
          .then(() => {
            console.log('Location details updated');
          });
      })
      .catch((err) => {
        // if the api request fails, wait 30 sec then try again
        console.error('Google Places API error: ', err);
        setTimeout(getLocationDetails, 30000, eventID, address);
      });
  }

  // creates an event and calls getLocationDetails()
  function createEvent(details) {
    return new Promise((resolve, reject) => {
      knex
        .insert({
          title: details.title,
          address: details.address,
          event_date: details.date,
          description: details.description,
          menu_description: details.menu,
          price: details.price,
          capacity: details.capacity,
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
        })
        .catch((err) => {
          reject('Error saving event. Please make sure all required fields are filled out')
        })
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
  // returns if a user has edit permissions for an event
  function hasEditPermssion(eventData, userID) {
    let returnVar = false;
    eventData.forEach((event) => {
      if (event.user_id === userID) {
        returnVar = true;
      }
    });
    return returnVar;
  }

  function howManyUsersBooked(eventID) {
    return knex('events')
            .join('user_events', 'user_events.event_id', '=', 'events.id')
            .join('user_event_roles', 'user_event_roles.user_event_id', '=', 'user_events.id')
            .select(knex.raw('count(*) as usersRegistered'))
            .where('events.id', eventID)
            .where('user_event_roles.role_id', 1) //role id 1 => guest
  }

  // allow them to update title, address, date/time, description, menu, capacity (but not less then the current amount of users, imageurl)
  function updateEvent(eventID, eventData) {
    return new Promise((resolve, reject) => {
      howManyUsersBooked(eventID)
        .then(results => {
          if (Object.keys(eventData).length === 0) {
            reject('You cannot update nothing!');
          }
          if (eventData.capacity < results[0].usersRegistered) {
            reject('You cannot have a capacity smaller than the number of users registered.');
          }
          if (eventData.address || eventData.city) {
            reject('To update the location of your event, please provide both a street address and city.');
          }
          if (eventData.address && eventData.city) {
            getLocationDetails(eventID, `${eventData.address} ${eventData.city}`);
          }
          knex('events')
            .where('id', eventID)
            .update({
              title: eventData.title,
              event_date: eventData.date,
              description: eventData.description,
              menu_description: eventData.menu,
              price: eventData.price,
              capacity: eventData.capacity,
              image: eventData.image
              })
            .then(() => {
              resolve();
            });
        })
    });
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
    getReviewsByEvent,
    hasEditPermssion,
    updateEvent
  };
}

