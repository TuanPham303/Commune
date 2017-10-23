"use strict";


//Creating helper functions to bridge data to the website
module.exports = function makeEventHelpers(knex) {

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
    //export all functions
    userIsBooked,
    eventHasSpace,
    addUserToEvent
  };
};
