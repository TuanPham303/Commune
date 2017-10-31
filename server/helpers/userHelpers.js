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
      .select('id', 'first_name', 'last_name', 'email', 'is_chef', 'is_host', 'avatar')
      .where({id})
      .limit(1)
      .then(([user]) => user);
  }

  //Authenticate our user for login - email and password fields
  function authenticateUser(email, password) {
    return findByEmail(email)
      .then((user) => {
        if(!user) return false;
        return bcrypt.compare(password, user.password_digest)
        .then((matches) => {
          if(!matches) return false;
          return user;
        })
        .then(user => {
          return findById(user.id);
        })
      });
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
  function addUser(first_name, last_name, email, is_host, is_chef, password, avatar) {
    return (
      checkEmailUnique(email) //Is email unique?
      .then(() => bcrypt.hash(password, 10))
      .then((passwordDigest) => {
        return knex('users').insert({
          first_name: first_name,
          last_name: last_name,
          email: email,
          is_host: is_host,
          is_chef: is_chef,
          password_digest: passwordDigest,
          avatar: avatar
        }).returning(['id', 'first_name', 'last_name', 'email', 'is_host', 'is_chef'])
        .then((user)=> {
          return user;
        });
      })
      .catch((error) => console.error("Invalid user register", error))
    )
  }

  function becomeHost(id) {
    return knex('users')
    .where('id', id)
    .update({is_host: true})
  }

  function becomeChef(id) {
    return knex('users')
    .where('id', id)
    .update({is_chef: true})
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
    becomeChef
  };
};