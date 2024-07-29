// Example using Knex
const knex = require('knex');
const knexConfig = require('./knexfile'); // Adjust the path to your Knex configuration

const db = knex(knexConfig.development);

module.exports = db;
