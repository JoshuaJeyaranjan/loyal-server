exports.up = function(knex) {
    return knex.schema.createTable('collections', table => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.text('description').notNullable(); 
      table.string('default_image'); // Reference to one of the product images
      table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('collections');
  };
  