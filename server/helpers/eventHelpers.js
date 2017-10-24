"use strict";


//Creating helper functions to bridge data to the website
module.exports = function makeEventHelpers(knex) {

  // makes a (single) call to google place api to determine neighbourhood and lat/long
  function getLocationDetails(eventID, address) {

  }

  // creates an event and calls getLocationDetails()
  function createEvent(details) {
    const createEventPromise = new Promise((resolve,reject) => {
      knex
        .insert({
          title: details.title, //required
          address: details.address, //required
          date: details.date,
          description: details.description,
          menu: details.menu,
          price: details.price, //required
          capacity: details.capacity //required
        })
        .into('events')
        .returning('id')
        .then((id) => {
          details.users.forEach((user) => {
            addUserToEvent(user.user, id, user.role);
          })
          .then(() => {
              resolve();
            });
          //call getLocationDetails() - dont wait for this one before returning
        });
    });
    return createEventPromise;
  }

  // returns true or false if a user has booked an event
  function userIsBooked(userID, eventID) {
    const userIsBookedPromise = new Promise((resolve,reject) => {
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
    return userIsBookedPromise;
  }

  // returns true or false if event has spaces
  function eventHasSpace(eventID) {
    const eventHasSpacePromise = new Promise((resolve,reject) => {
      knex('user_events')
        .join('events', 'user_events.event_id', '=', 'events.id')
        .select(knex.raw('count(*) as usersCount, capacity'))
        .where('event_id', 10000)
        .groupBy('capacity')
        .then(results => {
          resolve(results[0].capacity > results[0].userscount);
        });
    });
    return eventHasSpacePromise;
  }

  // adds user to event and adds user role
  function addUserToEvent(userID, eventID, roleID) {
    const addUserToEventPromise = new Promise((resolve,reject) => {
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
    return addUserToEventPromise;
  }

  return {
    createEvent,
    userIsBooked,
    eventHasSpace,
    addUserToEvent
  };
};
