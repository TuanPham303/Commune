"use strict";

const express = require("express");
const router = express.Router();
const cookieSession = require('cookie-session');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
// const paymentHelpersFunction = require("../helpers/paymentHelpers");

module.exports = knex => {
  // const paymentHelpers = paymentHelpersFunction(knex);

  router.post('/save-stripe-token', (req, res) => {
    const token = req.body;
    console.log(token);
    const chargeAmount = req.body.chargeAmount;
    stripe.charges.create({
      currentcy: "CAD",
      source: token
    }, function(err, charge){
      if(err && err.type === "StripeCardError"){
       console.log('your card was declined');
      }
      console.log(charge);
    });
  });

  return router;
}