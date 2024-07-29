const express = require('express');
const router = express.Router();

const knex = require('../db'); // Make sure this is correctly configured

// Add inventory item
router.post('/inventory', async (req, res) => {
  const { name, description, regularPrice, salePrice } = req.body;

  if (!name || !description || !regularPrice) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    await knex('products').insert({
      name,
      description,
      regular_price: regularPrice,
      sale_price: salePrice || regularPrice, // Default to regularPrice if salePrice is not provided
      created_at: new Date(),
      updated_at: new Date(),
    });

    res.status(201).json({ message: 'Product added successfully' });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update inventory item
router.put('/inventory/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, regularPrice, salePrice } = req.body;

  try {
    const result = await knex('products')
      .where({ id })
      .update({
        name,
        description,
        regular_price: regularPrice,
        sale_price: salePrice || regularPrice,
        updated_at: new Date(),
      });

    if (result) {
      res.status(200).json({ message: 'Product updated successfully' });
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete inventory item
router.delete('/inventory/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await knex('products').where({ id }).del();

    if (result) {
      res.status(200).json({ message: 'Product deleted successfully' });
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get list of users
router.get('/users', async (req, res) => {
  try {
    const users = await knex('users').select('id', 'email');
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
