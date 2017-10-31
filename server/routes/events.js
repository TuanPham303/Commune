
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

  router.post('/:id/reviews', (req,res) => {
    let reviewerId = req.body.reviewerId;
    let eventId = req.params.id;
    let userId = req.body.user_id;
    let rating = req.body.rating;
    let description = req.body.description;

    eventHelpers.postReview(reviewerId, eventId, userId, rating, description)
    .then(() => {
      return res.sendStatus(201);
    })
    .catch(error => {
      console.error('Error adding review:', error);
      return res.sendStatus(500);
    })
  });

  router.get('/:id/guestlist', (req, res) => {
    eventHelpers.getGuestlist(req.params.id)
    .then(users => {
      return res.json(users);
    })
  });

  router.get('/publickeys', (req, res) => {
    return res.json({stripePKey: process.env.STRIPE_PUBLIC_KEY, googleMapKey: process.env.GOOGLE_MAPS_JAVASCRIPT_KEY});
  });

  // get details on all events that match the search term
  router.get('/search', (req, res) => {
    let searchValue = req.query.search.split(' ').join(' | ')
    if (searchValue.trim() === '') { //Checks if query is empty
      res.status(400);
    } else {
      knex
      .raw(
      `SELECT event_id, user_id, title, description, price, capacity, neighbourhood, address, first_name, last_name
      FROM ( SELECT events.id as event_id,
                    events.title as title,
                    events.description as description,
                    events.price as price,
                    events.capacity as capacity,
                    events.neighbourhood as neighbourhood,
                    events.address as address,
                    users.id as user_id,
                    users.first_name as first_name,
                    users.last_name as last_name,
                    to_tsvector(events.title)
                    || to_tsvector(events.description)
                    || to_tsvector(events.menu_description)
                    || to_tsvector(coalesce(users.first_name, ''))
                    || to_tsvector(coalesce(users.last_name, ''))
                    || to_tsvector(coalesce((string_agg(events.neighbourhood, ' ')), '')) as document
                    FROM events
                    JOIN user_events ON events.id = user_events.event_id
                    JOIN users ON users.id = user_events.user_id
                    GROUP BY events.id, users.id) p_search
                    WHERE p_search.document @@ to_tsquery(?)`, searchValue)
      .then( (results) => {
        eventHelpers.normalizeData(results.rows)
        .then(results => {
          res.json(results);
        });
      });
    }
  });

  //update event
  router.post('/:id/edit', (req, res) => {
    eventHelpers.queryDB(req.params.id)
      .then((eventData) => {
        if (eventHelpers.hasEditPermssion(eventData, 10000)) {
          eventHelpers.updateEvent(req.params.id, req.body)
          .then(() => {
            res.sendStatus(200);
          })
          .catch(err => {
            console.error('Error updating event:', err);
            res.status(400).send(err);
          })
        }
        else {
          res.status(400).send('You don\'t have permission');
        }
      })
  });

  // add new event (add to events table, add host to user_events, etc)
  // takes current_user (becomes host), title, address, date/time (optional),
  //   description(optional), menu_description (optional), price, capacity, imageURL (optional)
  router.post('/new', (req, res) => {
    const rb = req.body;
    if (rb.users && rb.title && rb.address && rb.city && rb.price && rb.capacity) {
      const details = {
        users: rb.users, // an array of objects with user_id and role_id
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
      .then((id) => {
        res.status(201).send(id);
      })
      .catch(err => {
        res.status(400).send(err);
      })
    } else {
      res.status(400).send('Please fill out the required fields');
    }
  });

  // book an event for a user to attend as a guest
  // (add to user_events & user_event_roles tables)
  // doesnt allow duplicates
  // requires user id from cookie, event id from url
  router.post('/:id/book', (req, res) => {
    if ( req.session.user.id) {
      Promise.all([
        eventHelpers.userIsBooked(req.session.user.id, req.params.id),
        eventHelpers.eventHasSpace(req.params.id)
      ])
      .then(values => {
        if (!values[0] && values[1]) {
          eventHelpers.addUserToEvent(req.session.user.id, req.params.id, 1)
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

  router.get('/:id/reviews', (req, res) => {
    eventHelpers.getReviewsByEvent(req.params.id)
    .then(result => {
      res.json(result);
    });
  })

  return router;
}