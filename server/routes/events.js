"use strict";

const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const cookieSession = require('cookie-session');
const userHelpersFunction = require("../helpers/eventHelpers");

module.exports = knex => {
  const userhelpers = userHelpersFunction(knex);

  // get details on all events that match the search term
  router.get('/search/:query', (req, res) => {
    if (req.params.query.trim() === ''){ //Checks if query is empty
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
                    WHERE p_search.document @@ to_tsquery('${req.params.query}')`, req.query.search)
      .then( (results) => {
        console.log(results)
        res.json(results);
      });
    };
  });

  // add new event (post)
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
                res.sendStatus(201);  // what to return?
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