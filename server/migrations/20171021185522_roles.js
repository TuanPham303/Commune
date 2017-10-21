exports.up = function(knex, Promise) {
  return knex.schema.createTable('roles', function (table) {
    table.increments();
    table.string('role_name').notNullable();
  })
  .then(function () {
    return knex.schema.createTable('user_event_roles', function (table) {
      table.increments();
      table.integer('role_id').references('id').inTable('roles').notNullable().onDelete('cascade');
      table.integer('user_event_id').references('id').inTable('user_events').notNullable().onDelete('cascade');
    })
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user_event_roles')
  .then(function () {
    return knex.schema.dropTable('roles');
  })
};