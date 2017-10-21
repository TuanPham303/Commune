
exports.up = function(knex, Promise) {
  return knex.schema.table('users', function (table){
    table.dropColumn('password_digest');
  })
  .then(function () {
    return knex.schema.table('users', function (table){
      table.string('password_digest').notNullable();
    })
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', function (table){
    table.dropColumn('password_digest');
  })
  .then(function () {
    return knex.schema.table('users', function (table){
      table.string('password_digest');
    })
  })
};