
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function (table){
      table.increments();
      table.string('first_name').notNullable();
      table.string('last_name').notNullable();
      table.string('password_digest');
      table.string('email').notNullable();
      table.boolean('is_host');
      table.boolean('is_chef');
      table.timestamps(true, true);
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users')
  ])
};
