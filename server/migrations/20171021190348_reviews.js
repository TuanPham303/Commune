exports.up = function(knex, Promise) {
  return knex.schema.createTable('reviews', function (table) {
    table.increments();
    table.integer('reviewer_id').references('id').inTable('users').notNullable().onDelete('cascade');
    table.integer('user_event_id').references('id').inTable('user_events').notNullable().onDelete('cascade');
    table.decimal('rating',2,1).notNullable();
    table.text('description');
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('reviews');
};