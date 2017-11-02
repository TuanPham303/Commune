
"use strict";

const express              = require("express");
const router               = express.Router();
const bodyParser           = require("body-parser");
const cookieSession        = require('cookie-session');
const eventHelpersFunction = require("../helpers/eventHelpers");
const googleMapsClient     = require('@google/maps').createClient({
  key: process.env.GOOGLE_MAPS_API_KEY,
  Promise: Promise
});
const multer  = require('multer');
const path = require('path');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(path.join(__dirname,"../../", 'public/event-images/'));
    cb(null,path.join(__dirname, '../../', 'public/event-images/'))
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})
const upload = multer({ storage });

module.exports = knex => {
  const eventHelpers = eventHelpersFunction(knex, googleMapsClient);

  router.post('/:id/reviews', (req,res) => {
    console.log(req.body);
    let reviewerId = req.body.reviewer_id;
    let eventId = req.params.id;
    let userId = req.body.user_id;
    let rating = req.body.rating;
    let description = req.body.description;

    eventHelpers.postReview(reviewerId, eventId, userId, rating, description)
    .then(() => {
      return res.sendStatus(201);
    })
    .catch(error => {
      console.error('Error:', error);
      return res.sendStatus(500);
    })
  });

  router.get('/:id/guestlist', (req, res) => {
    eventHelpers.getGuestlist(req.params.id)
    .then(users => {
      return res.json(users);
    })
  });

  router.get('/publickeys', (req, res) => {
    return res.json({stripePKey: process.env.STRIPE_PUBLIC_KEY, googleMapKey: process.env.GOOGLE_MAPS_JAVASCRIPT_KEY});
  });

  // get details on all events that match the search term
  router.get('/search', (req, res) => {

  });

  //update event
  router.post('/:id/edit', (req, res) => {
    eventHelpers.queryDB(req.params.id)
      .then((eventData) => {
        if (eventHelpers.hasEditPermssion(eventData, 10000)) {
          eventHelpers.updateEvent(req.params.id, req.body)
          .then(() => {
            res.sendStatus(200);
          })
          .catch(err => {
            console.log(err);
            res.status(400).send(err);
          })
        }
        else {
          console.log('no perms');
          res.status(400).send('You don\'t have permission');
        }
      })
  });

  // add new event (add to events table, add host to user_events, etc)
  // takes current_user (becomes host), title, address, date/time (optional),
  //   description(optional), menu_description (optional), price, capacity, imageURL (optional)
  router.post('/new', upload.array('images'), (req, res) => {
    console.log("req body: ", req.body, "req files: ", req.files);
    const rb = req.body;
    if (rb.user && rb.title && rb.address && rb.city && rb.price && rb.capacity) {
      const details = {
        user: rb.user,
        role: rb.role,  // an array of objects with user_id and role_id
        title: rb.title,
        address: `${rb.address} ${rb.city}`,
        date: rb.date,
        description: rb.description,
        menu: rb.menu,
        price: rb.price,
        capacity: rb.capacity,
      }
      eventHelpers.createEvent(details)
      .then((id) => {
        console.log("ehelp.js 103: ", id);
        eventHelpers.createEventImages(id, req.files)
        .then((id) => {
          let eventId = JSON.stringify(id[0][0]);
          res.json(eventId);
        })
      })
      .catch(err => {
        res.status(400).send(err);
      })
    } else {
      res.status(400).send('Please fill out the required fields');
    }
  });

  // book an event for a user to attend as a guest
  // (add to user_events & user_event_roles tables)
  // doesnt allow duplicates
  // requires user id from cookie, event id from url
  router.post('/:id/book', (req, res) => {
    if ( req.session.user.id) {
      Promise.all([
        eventHelpers.userIsBooked(req.session.user.id, req.params.id),
        eventHelpers.eventHasSpace(req.params.id)
      ])
      .then(values => {
        if (!values[0] && values[1]) {
          eventHelpers.addUserToEvent(req.session.user.id, req.params.id, 1)
          .then(() => {
            res.sendStatus(201);
          })
        } else res.sendStatus(400);
      })
    } else res.sendStatus(400);
  });

  // get details about a particular event
  router.get('/:id', (req, res) => {
    eventHelpers.queryDB(req.params.id)
      .then(results => {
          eventHelpers.normalizeData(results)
          .then(results => {
            res.json(results);
          });
        });
  });

  // get details on all events
  router.get('/', (req, res) => {
    eventHelpers.queryDB(0)
      .then(results => {
          eventHelpers.normalizeData(results)
          .then(results => {
            console.log(results);
            Promise.all(results.map(function (event) {
              return new Promise(function (resolve, reject) {
                eventHelpers.getFirstEventImage(event.event_id).then(function (imageObjArray) {
                  // console.log('imageObj for event', event.event_id, JSON.stringify(imageObjArray));
                  if (imageObjArray.length > 0) {
                    resolve(imageObjArray[0].image);
                  } else {
                    resolve('/event-images/event_default.jpg');
                  }
                }).catch(function () {
                  resolve('/event-images/event_default.jpg');
                });
              });
            })).then(function (imageUrls) {
              // Because results and imageUrls have the same length, we can use the index to map the
              // event image url to each image
              results.forEach(function (event, index) {
                event.image_url = imageUrls[index];
                // return event;
              });
              res.json(results);
            });
            //   event.image_url = eventHelpers.getFirstEventImage(event.event_id)
            //   return 
            // })
            // for (let event of results) {
            //   eventHelpers.getFirstEventImage(event.event_id)
            //   .then(imageObj => {
            //     event.image_url = imageObj.image
            //     console.log(event);
            //   })
            // }
            // results.forEach(event => {
            //   eventHelpers.getFirstEventImage(event.event_id)
            //   .then(imageURL => {
            //     event: {
            //       image_url: imageURL
            //     }
            //   }).then(result => {
            //     console.log(result[0]);
            //   })
            // })
            // res.json(results);
          });
        });
  });

  router.get('/:id/images', (req, res) => {
    eventHelpers.getAllEventImages(req.params.id)
    .then(images => {
      res.json(images);
    })
  })

  router.get('/:id/image', (req, res) => {
    eventHelpers.getFirstEventImage(req.params.id)
    .then(image => {
      res.json(image);
    })
  })

  router.get('/:id/reviews', (req, res) => {
    eventHelpers.getReviewsByEvent(req.params.id)
    .then(result => {
      res.json(result);
    });
  })

  return router;
}