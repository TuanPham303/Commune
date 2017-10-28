"use strict";

const express = require("express");
const router = express.Router();
const cookieSession = require('cookie-session');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
// const paymentHelpersFunction = require("../helpers/paymentHelpers");

module.exports = knex => {
  // const paymentHelpers = paymentHelpersFunction(knex);

  router.post('/save-stripe-token', (req, res) => {
    const token = req.body.token;
    const amount = (req.body.amount * 100);
    stripe.charges.create({
      amount,
      description: "Commune Booking",
      currency: "CAD",
      source: token.id
    })
    .then(charge => res.json(charge))
    .catch(err => {
      console.log("Error:", err);
      res.status(500).send({error: "Purchase Failed"});
    });
  });

  return router;
}