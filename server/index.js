"use strict";

require("dotenv").config();

const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require('express');
const knex = require("knex")(knexConfig[ENV]);
const bodyParser = require("body-parser");

const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig[ENV]);
const morgan = require("morgan");
const knexLogger = require("knex-logger");

const app = express();

app.use(knexLogger(knex));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'))

app.listen(3001, () => {
  console.log('Listening on port 3001');
})