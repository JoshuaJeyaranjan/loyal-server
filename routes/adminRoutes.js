const express = require('express');
const router = express.Router();

const knex = require('../db'); // Make sure this is correctly configured

// Create a new collection
router.post('/collections', async (req, res) => {
  const { name, description, default_image } = req.body;
  try {
      const [collectionId] = await req.db('collections').insert({
          name,
          description,
          default_image,
      }).returning('id');

      res.status(201).json({ message: 'Collection created', collectionId });
  } catch (error) {
      res.status(500).json({ message: 'Error creating collection', error });
  }
});

// Assign products to a collection
router.post('/collections/:id/products', async (req, res) => {
  const { id } = req.params; // Collection ID
  const { productIds } = req.body; // Array of product IDs

  try {
      const assignments = productIds.map(productId => ({
          product_id: productId,
          collection_id: id,
      }));

      await knex('product_collections').insert(assignments);

      res.status(201).json({ message: 'Products assigned to collection' });
  } catch (error) {
      res.status(500).json({ message: 'Error assigning products to collection', error });
  }
});



// Add inventory item
router.post('/inventory', async (req, res) => {
  const { name, description, regularPrice, salePrice, bestseller } = req.body;

  if (!name || !description || !regularPrice) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    await knex('products').insert({
      name,
      description,
      bestseller: bestseller ? 1 : 0,
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
  const { name, description, regularPrice, salePrice, bestseller } = req.body;

  try {
    const result = await knex('products')
      .where({ id })
      .update({
        name,
        description,
        bestseller: bestseller ? 1 : 0,
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
