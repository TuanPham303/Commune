"use strict";

const express = require("express");
const router = express.Router();
const cookieSession = require('cookie-session');
const userHelpersFunction = require("../lib/data-movers");

module.exports = knex => {
  const userHelpers = userHelpersFunction(knex);

  router.get('/logout', (request, response) => {
    request.session = null;
    response.redirect("/");
  });

  router.post("/login", (request, response) => {
    let email = request.body.email;
    let password = request.body.password;

    userHelpers.authenticateUser(email, password).then((user) => {
      if (!user) {
        return response.status(403).send("Bad credentials");
      }
      request.session.user = user;
      response.redirect("/");
    });
  });

  router.post("/register", (request, response) => {
    let first_name = request.body.first_name;
    let last_name = request.body.last_name;
    let email = request.body.email;
    let username = request.body.username;
    let password = request.body.password;

    userHelpers.addUser(first_name, last_name, email, username, password).then((result) => {
      let id = result;
      request.session.user = user;
      response.redirect("/");
    })
    .catch((error) => console.log(error));
  });
}