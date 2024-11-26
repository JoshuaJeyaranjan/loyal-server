const express = require('express');
const path = require('path');
const upload = require('.././middleware/uploadConfig'); // Import multer configuration
const router = express.Router();

// Route to upload product images
router.post('/products/:id/images', upload.array('images', 5), async (req, res) => {
  try {
    const productId = req.params.id;
    const imagePaths = req.files.map((file) => `/uploads/${file.filename}`);

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

// Route to serve uploaded images
router.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

module.exports = router;
