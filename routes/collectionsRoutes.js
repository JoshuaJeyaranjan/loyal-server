const express = require('express');
const router = express.Router();
const knexConfig = require('../knexfile');  // Adjust the path if necessary
const db = require('knex')(knexConfig.development);  // Ensure you're using the correct environment configuration

// Get all collections
router.get('/', async (req, res) => {
  try {
    const collections = await db('collections').select('*');
    res.json(collections);
  } catch (error) {
    console.error("Error fetching collections:", error);
    res.status(500).send("Error fetching collections");
  }
});

// Get products for a specific collection
router.get('/:id/products', async (req, res) => {
  const { id } = req.params;

  try {
    const products = await db('products')
      .join('product_collections', 'products.id', '=', 'product_collections.product_id')
      .where('product_collections.collection_id', id)
      .select('products.*');  // Make sure select is called correctly

    res.json(products);
  } catch (error) {
    console.error('Error fetching products for collection:', error);  // Fixed error message
    res.status(500).send("Error fetching products for collection");
  }
});

module.exports = router;
