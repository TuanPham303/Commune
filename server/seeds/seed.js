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
      {id: 10000, first_name: 'Darby', last_name: 'Doe', email: 'dd@example.com', password_digest: 'password', is_host: true},
      {id: 20000, first_name: 'Shandle', last_name: 'Smith', email: 'ss@example.com', password_digest: 'password', is_host: true, is_chef: true},
      {id: 30000, first_name: 'Beruse', last_name: 'Jones', email: 'bj@example.com', password_digest: 'password'}
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
      {id: 20000, title: 'Leftovers', address: '126 West Hastings', price: '9.99', capacity: '10', event_date: new Date('October 17, 2017 18:00:00'), description: 'Whatever is in the fridge.'},
      {id: 30000, title: 'Basic Breakfast', address: '520 Victoria Drive', price: '18.5', capacity: '3'}
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
      {id: 70000, user_id: 20000, event_id: 30000}
    ])
  })
  .then(function () {
    return knex('user_event_roles').insert([
      {id: 10000, user_event_id: 10000 , role_id: 3},
      {id: 20000, user_event_id: 20000 , role_id: 2},
      {id: 30000, user_event_id: 30000 , role_id: 1},
      {id: 40000, user_event_id: 40000 , role_id: 3},
      {id: 50000, user_event_id: 40000 , role_id: 2},
      {id: 60000, user_event_id: 40000 , role_id: 1},
      {id: 70000, user_event_id: 50000 , role_id: 1},
      {id: 80000, user_event_id: 60000 , role_id: 1},
      {id: 90000, user_event_id: 70000 , role_id: 2}
    ]);
  })
};