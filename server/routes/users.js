"use strict";

const express = require("express");
const router = express.Router();
const cookieSession = require('cookie-session');
const userHelpersFunction = require("../helpers/userHelpers");
const multer  = require('multer');
const path = require('path');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // console.log(path.join(__dirname,"../../", 'public/user-avatars/'));
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
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let email = req.body.email;
    let password = req.body.password;
    let avatar = req.file ? `/user-avatars/${req.file.filename}` : '/user-avatars/default-avatar.png'

    return new Promise((resolve, reject) => {
      let errMsg = [];
      if (!first_name) {
        errMsg.push('firstNameErrMsg');
      };
      if (!last_name) {
        errMsg.push('lastNameErrMsg');
      };
      if (!password) {
        errMsg.push('passwordErrMsg');
      };
      if (!email) {
        errMsg.push('missingEmailErrMsg');
        resolve(errMsg);
      } else {
        userHelpers.checkEmailUnique(email)
        .then(result => {
          if (!result) {
            errMsg.push('takenEmailErrMsg');
          }
          resolve(errMsg);
        })
      }
    }).then((errMsg) => {
      if (!errMsg.length) {
        userHelpers.addUser(first_name, last_name, email, false, false, password, avatar)
        .then((user) => {
          req.session.user = user[0];
          res.json(user);
        })
        .catch((error) => {
          res.status(400).send(error);
        });
      } else {
        res.status(400).send(errMsg);
      };
    })
  });

  router.post('/upload', upload.single('avatar'), (req, res, next) => {
    console.log('file uploaded', req.file);
  })

  router.get('/current', (req,res) => {
    if (req.session.user) {
      userHelpers.findById(req.session.user.id)
      .then(user => {
        res.json(user);
      })
    } else {
      res.send('no current user')
    }
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

  return router;
}