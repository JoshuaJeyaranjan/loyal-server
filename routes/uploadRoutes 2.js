const express = require('express');
const path = require('path');
const upload = require('../middleware/uploadConfig'); // Import multer configuration for S3
const knex = require('../db/knex'); // Assuming you're using knex for database
const router = express.Router();

// Route to upload product images
router.post('/products/:id/images', upload.array('images', 5), async (req, res) => {
  try {
    const productId = req.params.id;

    // S3 URL of uploaded images
    const imagePaths = req.files.map((file) => file.location); // 'file.location' contains the S3 URL

    // Save the image paths to the database
    await knex('product_images').insert(
      imagePaths.map((path) => ({
        product_id: productId,
        path,
        created_at: new Date(),
      }))
    );
      
    res.status(201).json({ message: 'Images uploaded successfully', paths: imagePaths });
  } catch (error) {
    console.error('Error uploading images:', error);
    res.status(500).json({ error: 'Failed to upload images' });
  }
});

module.exports = router;
