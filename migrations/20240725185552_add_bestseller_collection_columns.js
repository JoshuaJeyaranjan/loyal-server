/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.table('products', function(table) {
      table.string('collection'); // Add category column
      table.boolean('bestseller');
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.table('products', function(table) {
      table.dropColumn('collection'); // Remove category column if rolling back
      table.dropColumn('bestseller');
    });
  };
  