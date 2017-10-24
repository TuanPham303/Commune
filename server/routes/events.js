"use strict";

const express              = require("express");
const router               = express.Router();
const bodyParser           = require("body-parser");
const cookieSession        = require('cookie-session');
const eventHelpersFunction = require("../helpers/eventHelpers");
const googleMapsClient     = require('@google/maps').createClient({
  key: process.env.GOOGLE_MAPS_API_KEY,
  Promise: Promise
});

module.exports = knex => {
  const eventHelpers = eventHelpersFunction(knex, googleMapsClient);

  // get details on all events that match the search term
  router.get('/search', (req, res) => {

  });

  //update event
  router.post('/:id/edit', (req, res) => {

  });

  router.post('/test', (req, res) => {
    eventHelpers.queryDB(20);
  });

  // add new event (add to events table, add host to user_events, etc)
  // takes current_user (becomes host), title, address, date/time (optional),
  //   description(optional), menu_description (optional), price, capacity, imageURL (optional)
  router.post('/new', (req, res) => {
    const rb = req.body;
    if (/*rb.users &&*/ rb.title && rb.address && rb.city && rb.price && rb.capacity) {
      const details = {
        users: /*rb.users*/[{user: 30000, role: 2}, {user: 10000, role: 1}], // an array of objects with user_id and role_id
        title: rb.title,
        address: `${rb.address} ${rb.city}`,
        date: rb.date,
        description: rb.description,
        menu: rb.menu,
        price: rb.price,
        capacity: rb.capacity,
        image: rb.image
      }
      eventHelpers.createEvent(details)
      .then(() => {
        res.sendStatus(201);
      })
    } else res.sendStatus(400);
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
    eventHelpers.queryDB(req.params.id)
      .then(results => {
          eventHelpers.normalizeData(results)
          .then(results => {
            res.json(results);
          });
        });
  });

  // get details on all events
  router.get('/', (req, res) => {
    eventHelpers.queryDB(0)
      .then(results => {
          eventHelpers.normalizeData(results)
          .then(results => {
            res.json(results);
          });
        });
  });

  return router;
}