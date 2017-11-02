const bcrypt = require('bcrypt');

exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('users').del(),
    knex('roles').del(),
    knex('events').del(),
    knex('user_events').del(),
    knex('user_event_roles').del()
  ])
  .then(function () {
    return knex('users').insert([
      {id: 10000, first_name: 'Darby', last_name: 'Doe', email: 'dd@example.com', avatar: '/user-avatars/default-avatar.png', password_digest: bcrypt.hashSync('password', 10), is_host: true},
      {id: 20000, first_name: 'Shandle', last_name: 'Smith', email: 'ss@example.com', avatar: '/user-avatars/default-avatar.png', password_digest: bcrypt.hashSync('password', 10), is_host: true, is_chef: true},
      {id: 30000, first_name: 'Beruse', last_name: 'Jones', email: 'bj@example.com', avatar: '/user-avatars/default-avatar.png', password_digest: bcrypt.hashSync('password', 10),},
      {id: 40000, first_name: 'Ryan', last_name: 'Pachune', avatar: '/users-avatars', password_digest: bcrypt.hashSync('password', 10), is_host: true},
    ])
  })
  .then(function () {
    return knex('roles').insert([
      {id: 1, role_name: 'guest'},
      {id: 2, role_name: 'host'},
      {id: 3, role_name: 'chef'}
    ])
  })
  .then(function () {
    return knex('events').insert([
      {id: 10000, title: 'Güd Food', address: '1892 West Broadway', price: '42', capacity: '6', event_date: new Date('November 17, 2017 12:00:00'), description: 'Food of the tasty variety.', menu_description: 'BACON WRAPPED SHRIMP\nSLOWLY COOKED SALMON, POTATO PUREE, SNAP PEAS, BLACK TRUFFLE EMULSION\nSOY GLAZED BEEF SHORT RIBS, APPLE JALAPEÑO PUREE, ROSEMARY CRUMBS\nSTEAMED SHRIMP SALAD WITH CHAMPAGNE VINAIGRETTE\nWARM CHOCOLATE CAKE, VANILLA ICE CREAM\nBEEF CARPACCIO PIZZA, SHAVED MUSHROOM, ARUGULA AND PARMESAN\nCRISPY CALAMARI LEMON ROSEMARY DIP\nCRISPY MACARONI AND CHEESE\nSALMON TARTARE, AVOCADO, SPICY RADISH, GINGER DRESSING\nHAMACHI SASHIMI, SOY GINGER DRESSING, RADISH AND AVOCADO\nPARMESAN CRUSTED CHICKEN, ASPARAGUS, LEMON-BASIL BUTTER\nRICE CRACKER CRUSTED TUNA, CITRUS CHILI EMULSION\nBLACK TRUFFLE PIZZA WITH FONTINA CHEESE\nBEETS, GOLDEN SHALLOTS, CHILIES, HERBS'},
      {id: 20000, title: 'Is this Swiss Chalet?', address: '126 West Hastings', price: '9.99', capacity: '10', event_date: new Date('October 17, 2017 18:00:00'), description: 'Wait a second? Did I just step into Swiss Chalet? This doesn\'t look like Swiss Chalet?', menu_description: 'Quarter Chicken & 1/3 Rack BBQ Side Ribs\nRotisserie Beef & Feature Ribs Combo\nSwiss Appetizer Platter'},
      {id: 30000, title: 'Basic Breakfast', address: '520 Victoria Drive', price: '18.5', capacity: '3'},
      {id: 40000, title: 'Dinner is Coming', address: '693 East Braemar', price: '39.99', capacity: '10', event_date: new Date('December 17, 2017 20:00:00'), description: 'Conquer Westeros with a dinner cooked by the Mother of Dragonfruits', menu_description: 'APPETIZERS: Dragon Eggs - Deviled Eggs with Horseradish and smoky bacon, Arya\'s Oysters - An oyster has no name, but does have chutney\nMAIN DISH: Whole Roast Chicken to Feast Like you are from the Iron Islands\nDRINKS: Spiced Mulled Wine - For Strategizing on Dragonstone\nDESSERT: Sticky Toffee Pudding Beyond the Wall - A pudding that could warm the heart of any White Walker'},
      {id: 50000, title: 'Homestyle Seafood by the Harbour', neighbourhood: 'Steveston', address: '4580 Britannia', price: '50.00', capacity: '5', event_date: new Date('December 17, 2017 13:00:00'), description: 'The perfect place to have a lunchtime rendezvous - Steveston Harbour', menu_description: 'Be prepared to have all of the seafood you can eat. We do not provide an official menu and instead invite you to help us create a menu specific to your favourites!\nOysters? Clams? Lobster? Salmon? Tuna? Crab? All of the above? Let us know your favs\n(Please keep in mind that due to seasonal considerations we may not be able to provide every type of seafood, but we will do our best)'},
      {id: 60000, title: 'Dinner AND a Movie', address: '2688 Mountain', price: '35.00', capacity: '11', event_date: new Date('December 17, 2017 18:00:00'), description: 'Come enjoy some yum foods to put you in the moods for a flick', menu_description: 'APPETIZER: Gourmet Four Cheese Mac n Cheese\nMAIN DISH: Chicken Cordon Bleu with heirloom veggies cooked in a balsamic reduction\nTAKE INTO THE MOVIE: Popcorn and Snacks!'},
      {id: 70000, title: 'Are We in Paris?', address: '425 East 13th', price: '60.00', capacity: '11', event_date: new Date('December 1, 2017 18:00:00'), description: 'Experience Parisian Dining in the comfort of our maison du jour', menu_description: 'A MANGER: Des frites, Une salad, Le poisson, Une pizza\nMOI AUSSI: Un hamburger, Un coca, Un sandwich\nA boire: Un cafe(au lait), De l\'eau minerale'},
      {id: 80000, title: 'The Art of Condiments', address: '2155 Bridgman Ave', price: '29.00', capacity: '11', event_date: new Date('December 2, 2017 18:00:00'), description: 'Come enjoy a journey through the history and nuance of condiments and sauce', menu_description: 'DISHES: Parmesan Frites with Six Selections of Aioli for dipping\nCarrot and Celery Sticks with 15 different ranch dressings for dipping\n4 types of tempura with 6 types of soy sauce for dipping\n5 breadstick types for 6 breadstick dips\n18 chips for dips\n10 types of dips with 15 dips for dipping\n2 dips for dips dips dipping with 10 more dipping dips'},
      {id: 90000, title: 'Games Night Sunday Chill', address: '1305 West 21st', price: '0', capacity: '11', event_date: new Date('December 10, 2017 17:00:00'), description: 'Our Weekly Chill Sesh Which Will Never Change: Ice Cream and Boardgames', menu_description: 'As always, this event is free to attend with one catch - bring ice cream to share!'},
      {id: 100000, title: 'Food Olympics', address: '2190 Philip Ave', price: '30.00', capacity: '11', event_date: new Date('December 3, 2017 16:30:00'), description: 'Want to represent your neighbourhood in a night filled with crazy food challenges?', menu_description: 'APPETIZER CHALLENGE: Obstacle Course Filled with Booths to test yourself on multiple spicy food eating challenges\nMAIN DISH CHALLENGE: Pita Bread Frisbee - test your wits and dexterity\nDESSERT CHALLENGE: A good ol\' fashion pumpkin pie eating contest'}
    ])
  })
  .then(function () {
    return knex('user_events').insert([
      {id: 10000, user_id: 10000, event_id: 10000},
      {id: 20000, user_id: 20000, event_id: 10000},
      {id: 30000, user_id: 30000, event_id: 10000},
      {id: 40000, user_id: 10000, event_id: 20000},
      {id: 50000, user_id: 20000, event_id: 20000},
      {id: 60000, user_id: 30000, event_id: 20000},
      {id: 70000, user_id: 20000, event_id: 30000},
      {id: 80000, user_id: 20000, event_id: 40000},
      {id: 90000, user_id: 30000, event_id: 50000},
      {id: 100000, user_id: 20000, event_id: 60000},
      {id: 110000, user_id: 10000, event_id: 70000},
      {id: 120000, user_id: 30000, event_id: 80000},
      {id: 130000, user_id: 10000, event_id: 90000},
      {id: 140000, user_id: 10000, event_id: 100000}
    ])
  })
  .then(function () {
    return knex('user_event_roles').insert([
      {id: 10000, user_event_id: 10000, role_id: 3},
      {id: 20000, user_event_id: 20000, role_id: 2},
      {id: 30000, user_event_id: 30000, role_id: 1},
      {id: 40000, user_event_id: 40000, role_id: 3},
      {id: 50000, user_event_id: 40000, role_id: 2},
      {id: 60000, user_event_id: 40000, role_id: 1},
      {id: 70000, user_event_id: 50000, role_id: 1},
      {id: 80000, user_event_id: 60000, role_id: 1},
      {id: 90000, user_event_id: 70000, role_id: 2},
      {id: 100000, user_event_id: 80000, role_id: 2},
      {id: 110000, user_event_id: 90000, role_id: 2},
      {id: 120000, user_event_id: 100000, role_id: 2},
      {id: 130000, user_event_id: 110000, role_id: 2},
      {id: 140000, user_event_id: 120000, role_id: 2},
      {id: 150000, user_event_id: 130000, role_id: 2}
    ]);
  })
  .then(function () {
    return knex('reviews').insert([
      {id: 10000, reviewer_id: 10000, user_event_id: 10000, rating: 4, description: 'good so far'},
      {id: 20000, reviewer_id: 10000, user_event_id: 10000, rating: 4, description: 'bad so far'},
      {id: 30000, reviewer_id: 10000, user_event_id: 10000, rating: 4, description: 'so so far'}
    ])
  })
};