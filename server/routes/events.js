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

  //update event
  router.post('/:id/edit', (req, res) => {

  });

  // add new event (add to events table, add host to user_events, etc)
  // takes current_user (becomes host), title, address, date/time (optional),
  //   description(optional), menu_description (optional), price, capacity
  router.post('/new', (req, res) => {
    const details = {
      users: /*req.body.usersHelping*/[{user: 30000, role: 2}], //required - an array of objects with user_id and role_id
      title: req.body.title, //required
      address: req.body.address, //required
      date: req.body.date,
      description: req.body.description,
      menu: req.body.menu,
      price: req.body.price, //required
      capacity: req.body.capacity //required
    }
    eventHelpers.createEvent(details)
    .then(() => {
      res.sendStatus(201);
    })
  });

  // book an event for a user to attend as a guest
  // (add to user_events & user_event_roles tables)
  // doesnt allow duplicates
  // requires user id from cookie, event id from url
  router.post('/:id/book', (req, res) => {
    if (/* req.session.user.id */ true) {
      Promise.all([
        eventHelpers.userIsBooked(/*req.session.user.id*/30000, req.params.id),
        eventHelpers.eventHasSpace(req.params.id)
      ])
      .then(values => {
        if (!values[0] && values[1]) {
          eventHelpers.addUserToEvent(/*req.session.user.id*/30000, req.params.id, 1)
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