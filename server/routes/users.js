"use strict";

const express = require("express");
const router = express.Router();
const cookieSession = require('cookie-session');
const userHelpersFunction = require("../helpers/userHelpers");

module.exports = knex => {
  const userHelpers = userHelpersFunction(knex);

  router.get('/logout', (req, res) => {
    req.session = null;
    res.redirect("/");
  });

  router.post("/login", (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    userHelpers.authenticateUser(email, password).then((user) => {
      if (!user) {
        return res.status(403).send("Bad credentials");
      }
      req.session.user = user;
      res.redirect("/");
    });
  });

  router.post("/register", (req, res) => {
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;

    userHelpers.addUser(first_name, last_name, email, username, password).then((result) => {
      let user = result;
      req.session.user = user;
      res.redirect("/");
    })
    .catch((error) => console.log(error));
  });

  // Update user's is_host boolean in DB to true
  router.post('/:id/host', (req, res) => {
    let user = req.session.user;
    if (!user) {
      return res.status(401).send("Must be logged in to become a host");
    } else {
      userHelpers.becomeHost(user.email);
      res.render("/")
    }
  });

  // Get users details
  router.get('/:id', (req, res) => {
    userHelpers.findById(req.params.id)
    .then(user => {
      res.json(user);
    });
  });

  router.get('/:id/events', (req, res) => {
    userHelpers.findEventsByUserId(req.params.id)
    .then(result => {
      res.json(result);
    });
  });

  router.get('/:id/reviews', (req, res) => {
    userHelpers.findReviewsByUserId(req.params.id)
    .then(result => {
      res.json(result);
    });
  });

  router.get('/:id/reviewed', (req, res) => {
    userHelpers.findReviewsPostedByUserId(req.params.id)
    .then(result => {
      res.json(result);
    });
  });

  router.post('/:id/reviews', (req,res) => {
    let reviewerId = req.body.reviewerId;
    let eventId = req.body.eventId;
    let userId = req.params.id;
    let rating = req.body.rating;
    let description = req.body.description;

    userHelpers.postReview(reviewerId, eventId, userId, rating, description)
    .then(() => {
      res.sendStatus(201);
    });
  });

  return router;
}