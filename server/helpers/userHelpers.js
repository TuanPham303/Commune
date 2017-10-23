"use strict";

const bcrypt = require('bcrypt');

//Creating helper functions to bridge data to the website
module.exports = function makeUserHelpers(knex) {
   

  //Find email of user on login
  function findByEmail(email) {
    return knex('users')
      .where({email})
      .limit(1)
      .then(([user]) => user);
  }

  //Authenticate our user for login - email and password fields
    function authenticateUser(email, password) {
      return findByEmail(email)
        .then((user) => {
          if(!user) return false;
          return bcrypt.compare(password, user.password)
          .then((matches) => {
            if(!matches) return false;
            return user;
          })
        })
    }

  //Check if email is unique to database on register
  function checkEmailUnique(email) {
    return findByEmail(email)
      .then((user) => {
        if(!user) {
          return false;
          return email;
        }
      })
  }

  //Add new user on register
  function addUser(first_name, last_name, email, username, password) {
    return (
      checkEmailUnique(email) //Is email unique?
      .then(() => bcrypt.hash(password, 10))
      .then((passwordDigest) => {
        return knex('users').insert({
          first_name: first_name,
          last_name: last_name,
          email: email,
          username: username,
          password_digest: passwordDigest,
        })
        .then((user)=>{
          return user;
        });
      })
      .catch((error) => console.log("Invalid register", error))
    )
  }
  return {
  findByEmail,
  checkEmailUnique,
  authenticateUser,
  addUser
  };
};