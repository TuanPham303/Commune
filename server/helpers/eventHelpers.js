"use strict";


//Creating helper functions to bridge data to the website
module.exports = function makeEventHelpers(knex, googleMapsClient) {

  function queryDB(eventID) {
    let compare;
    console.log(!eventID);
    !eventID ? compare = '>' : compare = '=';
    console.log(compare);
    return new Promise((resolve, reject) => {
      knex('events')
        .join('user_events', 'user_events.event_id', '=', 'events.id')
        .join('user_event_roles', 'user_event_roles.user_event_id', '=', 'user_events.id')
        .join('roles', 'roles.id', '=', 'user_event_roles.role_id')
        .join('users', 'users.id', '=', 'user_events.user_id')
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

  return {
    queryDB,
    getLocationDetails,
    createEvent,
    userIsBooked,
    eventHasSpace,
    addUserToEvent
  };
};
