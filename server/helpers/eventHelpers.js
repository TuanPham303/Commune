"use strict";


//Creating helper functions to bridge data to the website
module.exports = function makeUserHelpers(knex) {

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
    return userIsBookedPromise
  }

  function addAsGuest(userID, eventID) {
    const addAsGuestPromise = new Promise((resolve,reject) => {
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
              role_id: 1
            })
            .into('user_event_roles')
            .then(() => {
              resolve();
            });
        });
    });
    return addAsGuestPromise
  }

  return {
    //export all functions
    userIsBooked,
    addAsGuest
  };
};
