"use strict";

const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const cookieSession = require('cookie-session');
const eventHelpersFunction = require("../helpers/eventHelpers");

module.exports = knex => {
  const eventHelpers = eventHelpersFunction(knex);

  // get details on all events that match the search term
  router.get('/search', (req, res) => {

  });

  // add new event (post)
  router.post('/new', (req, res) => {

  });

  // book an event for a user to attend as a guest
  // (add to user_events & user_event_roles tables)
  // doesnt allow duplicates
  // requires user id from cookie, event id from url
  router.post('/:id/book', (req, res) => {
    if (/* req.session.id */ true) {
      const isBooked = eventHelpers.userIsBooked(/*req.session.id*/30000, req.params.id)
      .then(isBooked => {
        if (!isBooked) {
          eventHelpers.addAsGuest(/*req.session.id*/ 30000, req.params.id)
          .then(() => {
            res.sendStatus(201);
          })
        } else res.sendStatus(400);
      })
    } else res.sendStatus(400);
  });

  // get details about a particular event
  router.get('/:id', (req, res) => {
    knex('events')
      .where('id', req.params.id)
      .then(results => {
          res.json(results);
        });
  });

  // get details on all events
  router.get('/', (req, res) => {
    knex('events')
      .then(results => {
          res.json(results);
        });
  });

  return router;
}