"use strict";

const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const cookieSession = require('cookie-session');
const userHelpersFunction = require("../helpers/eventHelpers");

module.exports = knex => {
  const userhelpers = userHelpersFunction(knex);

  // get details on all events that match the search term
  router.get('/search', (req, res) => {

  });

  //add new event (post)
  router.post('/new', (req, res) => {

  });

  // book an event for a user (add to user_events & user_event_roles tables)
  // requires role id in body as 'role', user id from cookie, event id from url
  router.post('/:id/book', (req, res) => {
    if (/* req.session.id */ true) {
      knex
          .insert({
            user_id: /*req.session.id*/ 30000,
            event_id: req.params.id
          })
          .into("user_events")
          .returning('id')
          .then(function (id) {
            knex
              .insert({
                user_event_id: Number(id),
                role_id: req.body.role
              })
              .into("user_event_roles")
              .then(results => {
                res.json(results);  // what to return?
              });
          });
    }
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