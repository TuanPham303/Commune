"use strict";

const express = require("express");
const router = express.Router();
const cookieSession = require('cookie-session');
const userHelpersFunction = require("../helpers/userHelpers");
const multer  = require('multer');
const path = require('path');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(path.join(__dirname,"../../", 'public/user-avatars/'));
    cb(null,path.join(__dirname, '../../', 'public/user-avatars/'))
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})
const upload = multer({ storage });

module.exports = knex => {
  const userHelpers = userHelpersFunction(knex);

  router.post('/logout', (req, res) => {
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
      res.json(user);
    });
  });

  router.post("/register", upload.single('avatar'), (req, res) => {
    console.log(req.body, req.file);
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let email = req.body.email;
    let is_host= false;
    let is_chef= false;
    let password = req.body.password;
    let avatar = `/user-avatars/${req.file.filename}`

    userHelpers.addUser(first_name, last_name, email, is_host, is_chef, password, avatar).then((user) => {
      req.session.user = user[0];
      res.json(user);
    })
    .catch((error) => console.error(error));
  });

  router.post('/upload', upload.single('avatar'), (req, res, next) => {
    console.log(req.file);
  })
  
  router.get('/current', (req,res) => {
    userHelpers.findById(req.session.user.id)
    .then(user => {
      res.json(user);
    })
  });

  // Update user's is_host boolean in DB to true
  router.post('/becomehost', (req, res) => {
    let user = req.session.user;
    if (!user) {
      return res.status(401).send("Must be logged in to become a host");
    } else {
      userHelpers.becomeHost(user.id)
      .then(() => {
        res.sendStatus(201);
      })
    }
  });

  // Update user's is_chef boolean in DB to true
  router.post('/becomechef', (req, res) => {
    let user = req.session.user;
    if (!user) {
      return res.status(401).send("Must be logged in to become a host");
    } else {
      userHelpers.becomeChef(user.id)
      .then(() => {
        res.sendStatus(201);
      })
    }
  });

  // Get users details
  router.get('/:id', (req, res) => {
    userHelpers.findById(req.params.id)
    .then(user => {
      res.json(user);
    });
  });

  router.get('/:id/events/hosted', (req, res) => {
    userHelpers.findHostedEventsByUserId(req.params.id)
    .then(result => {
      res.json(result);
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

  router.get('/:id/rating', (req, res) => {
    userHelpers.getRatingbyUserId(req.params.id)
    .then(rating => {
      res.json(rating[0].avg);
    });
  });

  // router.post('/:id/reviews', (req,res) => {
  //   let reviewerId = req.body.reviewerId;
  //   let eventId = req.body.eventId;
  //   let userId = req.params.id;
  //   let rating = req.body.rating;
  //   let description = req.body.description;

  //   userHelpers.postReview(reviewerId, eventId, userId, rating, description)
  //   .then(() => {
  //     res.sendStatus(201);
  //   });
  // });

  return router;
}