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
      {id: 20001, first_name: 'Ryan', last_name: 'Pachune', email: 'rp@email.com', avatar: '/user-avatars/man_2.png', password_digest: bcrypt.hashSync('password', 10), is_host: true},
      {id: 20002, first_name: 'Mandy', last_name: 'Parsons', email: 'mp@email.com', avatar: '/user-avatars/girl_3.png', password_digest: bcrypt.hashSync('password', 10), is_host: true},
      {id: 20003, first_name: 'Reggie', last_name: 'Fasoon', email: 'rf@email.com', avatar: '/user-avatars/student.png', password_digest: bcrypt.hashSync('password', 10), is_host: true},
      {id: 20004, first_name: 'Helo', last_name: 'Werld', email: 'hw@email.com', avatar: '/user-avatars/girl_5.png', password_digest: bcrypt.hashSync('password', 10), is_host: true},
      {id: 20005, first_name: 'Tammy', last_name: 'Stringer', email: 'ts@email.com', avatar: '/user-avatars/girl_3.png', password_digest: bcrypt.hashSync('password', 10), is_host: true},
      {id: 20006, first_name: 'Aidan', last_name: 'Sloe', email: 'as@email.com', avatar: '/user-avatars/man.png', password_digest: bcrypt.hashSync('password', 10), is_host: true},
      {id: 20007, first_name: 'J.', last_name: 'Bertram-Sloan', email: 'jbs@email.com', avatar: '/user-avatars/man_3.png', password_digest: bcrypt.hashSync('password', 10), is_host: true},
      {id: 20008, first_name: 'Matthew', last_name: 'Wettle', email: 'mw@email.com', avatar: '/user-avatars/boy_5.png', password_digest: bcrypt.hashSync('password', 10), is_host: true, is_chef: true},
      {id: 20009, first_name: 'Sam', last_name: 'Jamrose', email: 'sj@email.com', avatar: '/user-avatars/boy_3.png', password_digest: bcrypt.hashSync('password', 10)},
      {id: 20010, first_name: 'Anju', last_name: 'Hifam', email: 'ah@email.com', avatar: '/user-avatars/girl_3.png', password_digest: bcrypt.hashSync('password', 10)},
      {id: 20011, first_name: 'Ashley', last_name: 'Hightower', email: 'ah@email.com', avatar: '/user-avatars/girl_1.png', password_digest: bcrypt.hashSync('password', 10)},
      {id: 20012, first_name: 'Ben', last_name: 'Yopple', email: 'by@email.com', avatar: '/user-avatars/boy_3.png', password_digest: bcrypt.hashSync('password', 10)},
      {id: 20013, first_name: 'Tandy', last_name: 'Raible', email: 'tr@email.com', avatar: '/user-avatars/girl_6.png', password_digest: bcrypt.hashSync('password', 10)},
      {id: 20014, first_name: 'Esther', last_name: 'Bones', email: 'eb@email.com', avatar: '/user-avatars/woman.png', password_digest: bcrypt.hashSync('password', 10)},
      {id: 20015, first_name: 'Marquise', last_name: 'Brown', email: 'mb@email.com', avatar: '/user-avatars/businessman.png', password_digest: bcrypt.hashSync('password', 10)},
      {id: 20016, first_name: 'Vinny', last_name: 'Hamlon', email: 'vh@email.com', avatar: '/user-avatars/student.png', password_digest: bcrypt.hashSync('password', 10), is_host: true},
      {id: 20017, first_name: 'Jared', last_name: 'Ackerman', email: 'ja@email.com', avatar: '/user-avatars/boy_3.png', password_digest: bcrypt.hashSync('password', 10), is_host: true},
      {id: 30000, first_name: 'Beruse', last_name: 'Jones', email: 'bj@example.com', avatar: '/user-avatars/man_3.png', password_digest: bcrypt.hashSync('password', 10), is_chef: true},
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
      {id: 10000, title: 'Güd Food', address: '1892 West Broadway, Vancouver, BC V6J 1Y9, Canada', neighbourhood: 'Kitsilano', location: knex.raw('point(49.263626, -123.147903)'), price: '42', capacity: '6', event_date: new Date('November 17, 2017 12:00:00'), description: 'Food of the tasty variety.', menu_description: 'BACON WRAPPED SHRIMP\nSLOWLY COOKED SALMON, POTATO PUREE, SNAP PEAS, BLACK TRUFFLE EMULSION\nSOY GLAZED BEEF SHORT RIBS, APPLE JALAPEÑO PUREE, ROSEMARY CRUMBS\nSTEAMED SHRIMP SALAD WITH CHAMPAGNE VINAIGRETTE\nWARM CHOCOLATE CAKE, VANILLA ICE CREAM\nBEEF CARPACCIO PIZZA, SHAVED MUSHROOM, ARUGULA AND PARMESAN\nCRISPY CALAMARI LEMON ROSEMARY DIP\nCRISPY MACARONI AND CHEESE\nSALMON TARTARE, AVOCADO, SPICY RADISH, GINGER DRESSING\nHAMACHI SASHIMI, SOY GINGER DRESSING, RADISH AND AVOCADO\nPARMESAN CRUSTED CHICKEN, ASPARAGUS, LEMON-BASIL BUTTER\nRICE CRACKER CRUSTED TUNA, CITRUS CHILI EMULSION\nBLACK TRUFFLE PIZZA WITH FONTINA CHEESE\nBEETS, GOLDEN SHALLOTS, CHILIES, HERBS'},
      {id: 10001, title: 'Rustic Brunch', address: '3314 Panorama Ridge, Whistler, BC V0N 1B3, Canada', neighbourhood: 'Whistler', location: knex.raw('point(50.106924, -122.967214)'), price: '35', capacity: '4', event_date: new Date('December 10, 2017 11:00:00'), description: 'We\’ll set the table, you enjoy the sights and sounds of nature in our very own house away from home', menu_description: 'CHOICE OF:\n\nRatatouille with Oven-Poached Eggs\nFrench Benedict French Toast\n2 Denver Hash-Brown Egg Nests\nBlueberry & Ginger Pancakes with Lemon Cream\nSouthwest Chorizo-Cheese Waffles\n\nTHE GOODS:\n\nLocally Roasted Coffee\nHot Chocolate\nFresh Juices\n\nON REQUEST:\nScarlet Mimosas\n\n**ON REQUEST items will be added with an extra surcharge'},
      {id: 10002, title: 'Farm to Table Favourites', address: '412 Alexander Street, Vancouver, BC V6A 1C5, Canada', neighbourhood: 'Railtown', location: knex.raw('point(49.283939, -123.094478)'), price: '32', capacity: '5', event_date: new Date('November 10, 2017 20:30:00'), description: 'Come enjoy brunch or breakfast (we\’ll let you decide) – be prepared for the freshest veggies you\’ll ever eat!', menu_description: 'TOMATO BASIL BRUSCETTA\nServed on rosemary focaccia with tomato, basil and rosemary from our garden\nPEAR AND GOAT CHEESE\nIn a buttery pastry puff – pears and cheese sourced locally\nBROCCOLI AND CHEDDAR SOUP\nFarm fresh broccoli and locally sourced cheddar cheese, with sautéed onions and fresh herbs\nfrom our garden\nSPRING KALE SALAD\nShredded Kale from a local farm, carrots and dried cherries with sugared walnuts and locally sourced feta'},
      {id: 10003, title: 'Upscale @ Reggie\'s Gourmet Kitchen', address: '1576 W 28th Avenue, Vancouver, BC V6J 2Y5, Canada', neighbourhood: 'Shaughnessy', location: knex.raw('point(49.246390, -123.141005)'), price: '70', capacity: '8', event_date: new Date('January 3, 2018 20:00:00'), description: 'Inspired by comfort foods, this dinner is full of bright & exciting flavours balanced with a filling and comforting dishes', menu_description: 'FAMILY STYLE STARTERS\n\nLemon Ricotta Crostini\nWhipped lemon ricotta on a garlic crostini drizzled with a balsamic reduction\nMozzarella Stuffed Arancini\nFried risotto balls stuffed with a melty mozzarella and tomato sauce\nWarm Broccolini & White Bean Salad\nRoasted until crispy, garnished with shaved parmesan, light citrus dressing \nMAIN\nHerb Studded Ravioli\nHomemade ravioli infused with fresh herbs. Filling & sauce is seasonal.\nDESSERT\nSeasonal Fruit Panna Cotta\nCreamy panna cotta with a seasonal fruit'},
      {id: 10004, title: 'Dessert Dessert DESSERT!', address: '3833 Princess Avenue, Vancouver, BC V7N 2E6, Canada', neighbourhood:'North Vancouver', location: knex.raw('point(49.344736, -123.056204)'), price: '25', capacity: '4', event_date: new Date('January 14, 2018 17:00:00'), description: '100 years of Home-Grown, Handed-Down Dessert Excellence', menu_description: 'Bayou City Petite Beignets\nDusted in Texas powdered sugar with Cafe au lait Anglaise\nMississippi Mud Pie\nDark chocolate mousse, candied pecan crunch, caramel corn and Heavenly Hash candy\nRobin\'s Favorite Lemon Meringue Pie\nLimoncello blueberry coulis & candied lemon zest\nSouthern Pecan Pie\nRio Grande organic pecans, dark chocolate ganache, warm caramel and vanilla ice cream\nCreole Cream Cheesecake\nHelo\'s Creole Cream Cheese, Chocolate Filigree, and Warm Caramel'},
      {id: 10005, title: 'Le Bistro Mirage', address: '2048 Larch St Vancouver, BC V6K 1S7, Canada', neighbourhood: 'Kitsilano', location: knex.raw('point(49.267601, -123.162292)'), price: '42', capacity: '4', event_date: new Date('December 21, 2017 19:30:00'), description: 'Dining In One of Vancouver\'s Growing Food Hot Spots', menu_description: 'Beef Bourguignon with Smoked bacon Lardons & Pearl Onions & Claret Jus\nRoasted Butternut Squash, Courgette & Feta Risotto with Mint Pesto\nPotato and Aubergine Curry\n<>\nWhite Chocolate Raspberry Cheesecake\nLavender poached pear with Poire Williams pudding'},
      {id: 10006, title: 'Backyard Barbeque', address: '2810 E 44th Ave Vancouver, BC V5R 3A6, Canada', neighbourhood: 'Killarney', location: knex.raw('point(49.230203, -123.047862)'), price: '15', capacity: '8', event_date: new Date('May 1, 2018 19:00:00'), description: 'Join us for a good old fashioned backyard BBQ', menu_description: 'I\'ll throw some steaks on the BBQ, and make a killer potato salad.\nYou bring your favourite beer.'},
      {id: 10007, title: 'Farm to Table Mount Pleasant', address: '900 E 7th Ave Vancouver', neighbourhood:'Mount Pleasant', location: knex.raw('point(49.264302, -123.083499)'), price: '83', capacity: '8', event_date: new Date('November 3, 2017 18:00:00'), description: 'An evening of locally sourced artisanal delicacies.\n Paired with BC Wines', menu_description: 'COURSE ONE\n Roasted Artichoke Dip with Burnt Carrot Pureé and fresh scallions\n  WINE - Howling Bluff 2015 Riesling COURSE TWO\n Haida Gwaii smoked salmon with capers, lemon and arugula. Served on parmesan garlic crostini. Sprinkled with dill\n WINE - Blasted Church 2016 Pinot Grigio\n COURSE THREE\n Traditional french bolognese made with Pemberton Valley grass fed beef, and handmade tagliatelle\n WINE - Burrowing Owl 2012 Cabernet Franc\n COURSE FOUR\n Vanilla skillet cake with local berry medley, mint and dusted with powdered sugar\n WINE - Inniskillin 2016 Chardonnay Ice Wine\n \n bon apetit.'},
      {id: 10008, title: 'Jared\'s on Lonsdale', address: '1576 Lonsdale Ave North Vancouver, BC V7M 2J3, Canada', neighbourhood:'Lonsdale', location: knex.raw('point(49.323159, -123.072036)'), price: '19.99', capacity: '6', event_date: new Date('November 30, 2017 12:00:00'), description: 'Join me in my home for some delicious food', menu_description: 'Your choice of:\n\nChicago Hot Dog, Hot Meatloaf Sandwich, Grilled Chicken Ceasar Salad'},
      {id: 10009, title: 'Kibbeh Workshop - Semolina Dumplings in Aromatic Soup', address: '1248 Broughton St, Vancouver, BC V6G 2B5, Canada', neighbourhood: 'West End, Downtown', location: knex.raw('point(49.283398, -123.136839)'), price: '35', capacity: '14', event_date: new Date('December 10, 2017 13:00:00'), description: 'Yumminess Awaits!', menu_description: 'Pasta & Basta is the perfect menu for fresh pasta lover. The evening will include 6 courses, we will offer a bottle of good wine to welcome everyone, we will follow with an appetizer and a tasting of three different homemade pasta dishes a beautiful dessert and also a plate of lemon bars serve with limoncello all executed by Chef Patrick.\n For the pasta tasting you will have spaghetti,ravioli and gnocchi  all combined  with seasonal sauces/recipes elected by the chef based on local market finds. The pasta recipes will be communicated to the guests two days prior to the event.\n The decadent chocolate mousse is developed for a celebrity, the chocolate mousse is made with 75% raw chocolate that has no sugar or dairy added, resulting in an unbelievable antioxidant propriety and delicious taste.\n\nPASTA TASTING\nHomemade Spaghetti\nChef selected market preparation. Comprehensive menu sent two days prior to event date and time.\nParmesan cheese 23 month home and figs in two way\n23 month age parmesan cheese, figs in two way, all served with a basket of home made focaccia and bread stick\nHomemade Ravioli\nChef selected market preparation. Comprehensive menu sent two days prior to event date and time.\nHomemade Gnocchi\nChef selected market preparation. Comprehensive menu sent two days prior to event date and time.\nHome made spaghetti\nChef selected market preparation. Comprehensive menu sent two days prior to event date and time.\n\nDESSERT\nSecret Recipe Chocolate Mousse\nRaw chocolate mousse served with wild berry and mascarpone cheese.\nHome made lemon bars and limoncello\nchef favourite lemon bar with home made limoncello'},
      {id: 10010, title: 'Green Goodness', address: '4815 West Boulevard, Vancouver, BC V6M 3W4, Canada', neighbourhood: 'Kerrisdale', location: knex.raw('point(49.238847, -123.154799)'), price: '32', capacity: '12', event_date: new Date('November 5, 2017 19:00:00'), description: 'We will explore a fresh take on green foods, you will leave glowing', menu_description: 'Besto Pesto - basil, parmesan, toasted pine nuts, olive oil, fresh baked bread\n Green Tomato Caprese - homegrown green tomato, fresh buffalo mozzarella, olive oil, balsaic reduction, basil\n Crunchy Brocollini - Tempura Style fried heirloom broccolini, capers, lemon, Himalayan rock salt, dill\n Lettuce Soup - Homegrown leafy greens, vegetable stock, pemberton potatoes, bc spot prawns'},
      {id: 10011, title: 'Ramen Making Party', address: '1489 McRae Ave, Vancouver, BC V6H 1T7, Canada', neighbourhood: 'Fairview', location: knex.raw('point(49.258394, -123.136777)'), price: '35', capacity: '4', event_date: new Date('December 10, 2017 19:35:00'), description: 'Who doesn\'t love Ramen?! Ever wondered how to make it? Come join us!', menu_description: 'Whether you\'d like to get your hands dirty with a hands-on noodle making experience or just watch us do it, you\'re welcome to join. You can join our community event or request a specific date/time for friends get-together, birthday celebration, bachelorette party and company team building event. Please inquire details if you are interested in having this event host at your home or your specific venue.\n\nThis is a BYOB event so feel free to bring your favorite beverages.\n\nSTARTER\nPot Sticker\nHouse made wrapper dough | Chopped cabbages | Ground pork (non-pork version available upon request)\n\nMAIN COURSE\nRamen\nThe noodles that you made | Tonkotsu pork bone broth broth sho-yu or spicy | Chashu | Soft boiled eggs | Menmo | Wood ear mushroom | Bean sprouts | Nori\n\nDESSERTS\nPaleo Chocolate Matcha Cake\nCoconut flour | Coconut milk | Almond flour | Honey | Matcha\n'},
      {id: 10012, title: 'BBQ Blitz', address: '128 Semlin Dr Vancouver, BC V5L 1K5', neighbourhood:'East Van', location: knex.raw('point(49.283503, -123.063389)'), price: '29', capacity: '6', event_date: new Date('November 5, 2017 19:00:00'), description: 'Southern Style BBQ that will blow your mind', menu_description: 'Charcuterie Boards, Smoked Pork Belly Poutine,\n BBQ Chicken Thighs and Pulled Pork with sliced bread\n Apple Pie'},
      {id: 20000, title: 'Is this Swiss Chalet?', address: '126 W Hastings St, Vancouver, BC V6B 1G9, Canada', neighbourhood: 'Gastown', location: knex.raw('point(49.282250, -123.108244)'), price: '39.99', capacity: '10', event_date: new Date('October 17, 2017 18:00:00'), description: 'Wait a second? Did I just step into Swiss Chalet? This doesn\'t look like Swiss Chalet?', menu_description: 'Quarter Chicken & 1/3 Rack BBQ Side Ribs\nRotisserie Beef & Feature Ribs Combo\nSwiss Appetizer Platter'},
      {id: 30000, title: 'Dinner is Coming: Eat on the Iron Throne', address: '693 Braemar Rd E, North Vancouver, BC V7N 4G1, Canada', neighbourhood: 'North Vancouver', location: knex.raw('point(49.345224, -123.057234)'), price: '39.99', capacity: '10', event_date: new Date('December 17, 2017 20:00:00'), description: 'Conquer Westeros with a dinner cooked by the Mother of Dragonfruits', menu_description: 'APPETIZERS: Dragon Eggs - Deviled Eggs with Horseradish and smoky bacon, Arya\'s Oysters - An oyster has no name, but does have chutney\nMAIN DISH: Whole Roast Chicken to Feast Like you are from the Iron Islands\nDRINKS: Spiced Mulled Wine - For Strategizing on Dragonstone\nDESSERT: Sticky Toffee Pudding Beyond the Wall - A pudding that could warm the heart of any White Walker'},
      {id: 40000, title: 'Homestyle Seafood by the Harbour', address: '4580 Britannia Dr, Richmond, BC V7E 6A9, Canada', neighbourhood: 'Steveston', location: knex.raw('point(49.124455, -123.172133)'), price: '50.00', capacity: '5', event_date: new Date('December 17, 2017 13:00:00'), description: 'The perfect place to have a lunchtime rendezvous - Steveston Harbour', menu_description: 'Be prepared to have all of the seafood you can eat. We do not provide an official menu and instead invite you to help us create a menu specific to your favourites!\nOysters? Clams? Lobster? Salmon? Tuna? Crab? All of the above? Let us know your favs\n(Please keep in mind that due to seasonal considerations we may not be able to provide every type of seafood, but we will do our best)'},
      {id: 50000, title: 'Dinner AND a Movie', address: '2688 Mountain Hwy, North Vancouver, BC V7J 2N5', neighbourhood: 'Lynn Valley', location: knex.raw('point(49.333093, -123.037679)'), price: '35.00', capacity: '11', event_date: new Date('December 17, 2017 18:00:00'), description: 'Come enjoy some yum foods to put you in the moods for a flick', menu_description: 'APPETIZER: Gourmet Four Cheese Mac n Cheese\nMAIN DISH: Chicken Cordon Bleu with heirloom veggies cooked in a balsamic reduction\nTAKE INTO THE MOVIE: Popcorn and Snacks!'},
      {id: 60000, title: 'Are We in Paris?', address: '2340 Western Pkwy, Vancouver, BC V6T 1W6, Canada', neighbourhood: 'UBC', location: knex.raw('point(49.264055, -123.241806)'), price: '60.00', capacity: '11', event_date: new Date('December 1, 2017 18:00:00'), description: 'Experience Parisian Dining in the comfort of our maison du jour', menu_description: 'A MANGER: Des frites, Une salad, Le poisson, Une pizza\nMOI AUSSI: Un hamburger, Un coca, Un sandwich\nA boire: Un cafe(au lait), De l\'eau minerale'},
      {id: 70000, title: 'The Art of Condiments', address: '2155 Bridgman Avenue, North Vancouver, BC V7P 2T8, Canada', neighbourhood: 'North Vancouver', location: knex.raw('point(49.329526, -123.110399)'), price: '29', capacity: '3', event_date: new Date('December 2, 2017 18:00:00'), description: 'Come enjoy a journey through the history and nuance of condiments and sauce', menu_description: 'DISHES: Parmesan Frites with Six Selections of Aioli for dipping\nCarrot and Celery Sticks with 15 different ranch dressings for dipping\n4 types of tempura with 6 types of soy sauce for dipping\n5 breadstick types for 6 breadstick dips\n18 chips for dips\n10 types of dips with 15 dips for dipping\n2 dips for dips dips dipping with 10 more dipping dips'},
      {id: 80000, title: 'Games Night Sunday Chill', address: '1305 21st Street West, North Vancouver, BC V7P 2E1, Canada', neighbourhood: 'North Vancouver', location: knex.raw('point(49.328681, -123.110805)'), price: '5', capacity: '11', event_date: new Date('December 10, 2017 17:00:00'), description: 'Our Weekly Chill Sesh Which Will Never Change: Ice Cream and Boardgames', menu_description: 'As always, this event is free to attend with one catch - bring ice cream to share!'},
    ])
  })
  .then(function () {
    return knex('user_events').insert([
      {id: 10000, user_id: 20001, event_id: 10001},
      {id: 20000, user_id: 20002, event_id: 10002},
      {id: 30000, user_id: 20003, event_id: 10003},
      {id: 40000, user_id: 20004, event_id: 10004},
      {id: 50000, user_id: 20000, event_id: 10005},
      {id: 60000, user_id: 30000, event_id: 10006},
      {id: 70000, user_id: 20006, event_id: 10007},
      {id: 80000, user_id: 20007, event_id: 10008},
      {id: 90000, user_id: 30000, event_id: 10009},
      {id: 100000, user_id: 20000, event_id: 10010},
      {id: 110000, user_id: 20007, event_id: 10011},
      {id: 120000, user_id: 20007, event_id: 10012},
      {id: 130000, user_id: 20008, event_id: 20000},
      {id: 140000, user_id: 20009, event_id: 10000},
      {id: 150000, user_id: 20007, event_id: 30000},
      {id: 160000, user_id: 20010, event_id: 40000},
      {id: 170000, user_id: 20011, event_id: 50000},
      {id: 180000, user_id: 20017, event_id: 60000},
      {id: 190000, user_id: 20006, event_id: 70000},
      {id: 200000, user_id: 20007, event_id: 80000},
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
      {id: 150000, user_event_id: 130000, role_id: 2},
      {id: 160000, user_event_id: 140000, role_id: 2},
      {id: 170000, user_event_id: 150000, role_id: 2},
      {id: 180000, user_event_id: 160000, role_id: 2},
      {id: 190000, user_event_id: 170000, role_id: 2},
      {id: 200000, user_event_id: 180000, role_id: 2},
      {id: 210000, user_event_id: 190000, role_id: 2},
      {id: 220000, user_event_id: 200000, role_id: 2}
    ]);
  })
  .then(function () {
    return knex('reviews').insert([
      {id: 10000, reviewer_id: 20000, user_event_id: 10000, rating: 5, description: 'Really really loved this one - great host!'},
      {id: 20000, reviewer_id: 20001, user_event_id: 10000, rating: 1, description: 'Didn\'t care for it'},
      {id: 30000, reviewer_id: 30000, user_event_id: 10000, rating: 3, description: 'Just alright - had a good time though'}
    ])
  })
};