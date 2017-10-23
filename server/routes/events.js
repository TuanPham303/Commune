const express = require("express");
const router = express.Router();
const moment = require('moment');

module.exports = knex => {
  
  // get events from database
  router.get("/", (req, res) => {
    knex
      .select()
      .table('events')
      .then(results => {
        results.forEach( result => {
          result.event_date = moment(result.event_date).format("dddd, MMMM Do YYYY, h:mm a");
        });
        res.json(results);
      });
  });
  return router;
}