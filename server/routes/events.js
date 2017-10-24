
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
    if (req.query.search.trim() === ''){ //Checks if query is empty
      res.status(400);
    } else {
      knex
      .raw(
      `SELECT pid, p_title, p_description, p_price, p_capacity, p_neighbourhood, p_address
      FROM ( SELECT events.id as pid,
                    events.title as p_title,
                    events.description as p_description,
                    events.price as p_price,
                    events.capacity as p_capacity,
                    events.neighbourhood as p_neighbourhood,
                    events.address as p_address,
                    to_tsvector(events.title)
                    || to_tsvector(events.description)
                    || to_tsvector(events.menu_description)
                    || to_tsvector(coalesce((string_agg(events.neighbourhood, ' ')), '')) as document
                    FROM events
                    GROUP BY events.id) p_search
                    WHERE p_search.document @@ to_tsquery('${req.query.search.split(' ').join(' | ')}')`)
      .then( (results) => {
        console.log(results.rows)
        res.json(results.rows);
      });
    }
  });

  // add new event (add to events table, add host to user_events, etc)
  // takes current_user (becomes host), title, address, date/time (optional),
  //   description(optional), menu_description (optional), price, capacity
  //   extra hosts/chefs?
  //
  router.post('/new', (req, res) => {

  });

  // book an event for a user to attend as a guest
  // (add to user_events & user_event_roles tables)
  // doesnt allow duplicates
  // requires user id from cookie, event id from url
  router.post('/:id/book', (req, res) => {
    if (/* req.session.id */ true) {
      Promise.all([
        eventHelpers.userIsBooked(/*req.session.id*/30000, req.params.id),
        eventHelpers.eventHasSpace(req.params.id)
      ])
      .then(values => {
        if (!values[0] && values[1]) {
          eventHelpers.addUserToEvent(/*req.session.id*/30000, req.params.id, 1)
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