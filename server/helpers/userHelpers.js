"use strict";

const bcrypt = require('bcrypt');

//Creating helper functions to bridge data to the website
module.exports = function makeUserHelpers(knex) {
   

  //Find email of user on login
  function findByEmail(email) {
    return knex('users')
      .where({email})
      .limit(1)
      .then(([user]) => user);
  }

    //Find ID of user on login
    function findById(id) {
      return knex('users')
        .select('*')
        .where({id})
        .limit(1)
        .then(([user]) => user);
    }

  //Authenticate our user for login - email and password fields
    function authenticateUser(email, password) {
      return findByEmail(email)
        .then((user) => {
          if(!user) return false;
          return bcrypt.compare(password, user.password)
          .then((matches) => {
            if(!matches) return false;
            return user;
          })
        })
    }

  //Check if email is unique to database on register
  function checkEmailUnique(email) {
    return findByEmail(email)
      .then((user) => {
        if(!user) {
          return false;
          return email;
        }
      })
  }

  //Add new user on register
  function addUser(first_name, last_name, email, is_host, is_chef, password) {
    return (
      checkEmailUnique(email) //Is email unique?
      .then(() => bcrypt.hash(password, 10))
      .then((passwordDigest) => {
        return knex('users').insert({
          first_name: first_name,
          last_name: last_name,
          email: email,
          is_host: false,
          is_chef: false,
          password_digest: passwordDigest,
        })
        .then((user)=>{
          return user;
        });
      })
      .catch((error) => console.log("Invalid register", error))
    )
  }

  function becomeHost(email) {
    return findByEmail(email)
      .then((user) => {
        return knex('users')
        .update(user)
        .where({is_host: true});
      })
  }

  function findEventsByUserId(user_id) {
    return knex('events')
    .join('user_events', 'user_events.event_id', 'events.id')
    .join('users', 'user_events.user_id', 'users.id')
    .where('users.id', user_id)
    .then((result) => result);
  }

  function findReviewsByUserId(user_id) {
    return knex('reviews')
    .join('user_events', 'user_events.id', 'reviews.user_event_id')
    .join('users', 'users.id', 'user_events.user_id')
    .join('events', 'events.id', 'user_events.event_id')
    .where('users.id', user_id)
    .then((result) => result);
  }

  function findReviewsPostedByUserId(user_id) {
    return knex('reviews')
    .join ('users', 'users.id', 'reviews.reviewer_id')
    .where ('reviews.reviewer_id', user_id)
    .then((result) => result);
  }

  function postReview(reviewerId, eventId, userId, rating, description) {
    const postReviewPromise = new Promise((resolve, reject) => {
      knex('user_events')
      .select('id')
      .where({
        user_id: userId,
        event_id: eventId
      })
      .then((userEvent) => {
        knex('reviews')
        .insert({
          reviewer_id: reviewerId,
          user_event_id: userEvent[0].id,
          rating: rating,
          description: description
        }).then(() => {
          resolve();
        });
      });
    });
    return postReviewPromise;
  }

  return {
  findByEmail,
  findById,
  checkEmailUnique,
  authenticateUser,
  addUser,
  becomeHost,
  findEventsByUserId,
  findReviewsByUserId,
  findReviewsPostedByUserId,
  postReview
  };
};