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
          return true;
        } else {
          return false;
        }
      })
  }

  //Add new user on register
  function addUser(first_name, last_name, email, is_host, is_chef, password, avatar) {
    return (
      bcrypt.hash(password, 10)
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
<<<<<<< HEAD
      .catch((error) => console.error("Invalid user register", error))
=======
      .catch((error) => console.error("Invalid register", error))
>>>>>>> origin/event-history
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


  function findHostedEventsByUserId(user_id) {
    return knex('events')
    .join('user_events', 'user_events.event_id', 'events.id')
    .join('users', 'user_events.user_id', 'users.id')
    .join('user_event_roles', 'user_event_roles.user_event_id', 'user_events.id')
    .where({'users.id': user_id,
            'user_event_roles.role_id': 2})
    .then((events) => {

      return Promise.all([
        events,
        Promise.all(events.map((event) => {
          return knex('reviews')
          .select(knex.raw('COUNT(rating) as review_count, AVG(rating) as review_avg '))
          .join('user_events', 'reviews.user_event_id', 'user_events.id')
          .join('events', 'events.id', 'user_events.id')
          .where('events.id', event.event_id)
        }))
      ]);
    })
    .then(all => {
      const events = all[0];
      const reviews = all[1];
      console.log('reviews length: ',reviews.length);
      console.log('events length: ',events.length);

      events.forEach((event, i) => {
        event.review_count = reviews[i][0].review_count;

        if (reviews[i][0].review_avg === null) {
          event.review_avg = 'N/A';
        } else {
          event.review_avg = reviews[i][0].review_avg;
        }
      })
      console.log(reviews);
      console.log(events);
      return events;

    })
  }

  function getRatingbyUserId(id) {
    return knex('reviews')
    .join('user_events', 'user_events.id', 'reviews.user_event_id')
    .join('users', 'users.id', 'user_events.user_id')
    .where('users.id', id)
    .avg('rating')
    .then(result => result);
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
<<<<<<< HEAD
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
=======
  findByEmail,
  findById,
  checkEmailUnique,
  authenticateUser,
  addUser,
  becomeHost,
  findEventsByUserId,
  findHostedEventsByUserId,
  findReviewsByUserId,
  findReviewsPostedByUserId,
  getRatingbyUserId,
  becomeChef
  // postReview
>>>>>>> origin/event-history
  };
};