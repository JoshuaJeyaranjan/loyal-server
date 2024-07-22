const express = require('express');
const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await req.db('products').select('*');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving products' });
  }
});

// Get a single product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await req.db('products').where({ id: req.params.id }).first();
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving product' });
  }
});

module.exports = router;
