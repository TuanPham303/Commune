"use strict";

function test123() {
  return 'whats this for';
}


//Creating helper functions to bridge data to the website
module.exports = function makeUserHelpers(knex) {

  return {
    //export all functions
    test123
  };
};