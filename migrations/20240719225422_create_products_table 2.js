/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('products', table => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('size');
      table.text('description').notNullable();
      table.decimal('regular_price', 10, 2).notNullable();
      table.decimal('sale_price', 10, 2);
      table.string('default_image'); // Reference to one of the product images
      table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('products');
  };
  