exports.up = function(knex, Promise) {
  return knex.schema.createTable('events', function (table) {
    table.increments();
    table.string('title').notNullable();
    table.string('address').notNullable();
    table.string('neighbourhood');
    table.specificType('location', 'POINT');
    table.timestamp('event_date');
    table.text('description');
    table.text('menu_description');
    table.decimal('price',10,2).notNullable();
    table.integer('capacity').notNullable();
    table.timestamps(true, true);
  })
  .then(function () {
    return knex.schema.createTable('user_events', function (table) {
      table.increments();
      table.integer('user_id').references('id').inTable('users').notNullable().onDelete('cascade');
      table.integer('event_id').references('id').inTable('events').notNullable().onDelete('cascade');
    })
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user_events')
  .then(function () {
    return knex.schema.dropTable('events');
  })
};