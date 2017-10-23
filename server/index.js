"use strict";

require("dotenv").config();

const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require('express');
const bodyParser = require("body-parser");

const knexConfig = require("../knexfile");
const knex = require("knex")(knexConfig[ENV]);
const morgan = require("morgan");
const knexLogger = require("knex-logger");

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");
const eventsRoutes = require("./routes/events");




const app = express();

app.use(knexLogger(knex));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'))

// app.use("/api/users", usersRoutes(knex));
app.use("/api/events", eventsRoutes(knex));


app.listen(3001, () => {
  console.log('Listening on port 3001');
})