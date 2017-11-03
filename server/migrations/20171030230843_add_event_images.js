
exports.up = function(knex, Promise) {
  return knex.schema.createTable('event_images', function (table) {
    table.increments();
    table.string('image').notNullable();
    table.integer('event_id').references('id').inTable('events').notNullable().onDelete('cascade');
  })
  .then(function() {
    return knex.schema.table('events', function (table){
      table.dropColumn('image_url');
    })
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('event_images')
  .then(function () {
    return knex.schema.table('events', function(table) {
      table.string('image_url')
    })
  })
};
