const express = require("express");
const router = express.Router();
const knex = require("../db");
const AWS = require("../middleware/awsConfig");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

const s3 = new AWS.S3();
const upload = multer({ dest: "uploads/" });

//Presigned url for uploads
router.post("/generate-presigned-url", (req, res) => {
  const { fileName, fileType } = req.body;

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `uploads/${fileName}`,
    Expires: 60,
    ContentType: fileType,
  };

  s3.getSignedUrl("putObject", params, (err, url) => {
    if (err) {
      console.error("ERROR generating url:", err);
      return res.status(500).send("Error generating url");
    }
    res.json({ url });
  });
});

//Get all Images
router.get('/images', async (req, res) => {
    try {
        const images = await knex('images').select('*');
        res.json(images);
    } catch (error) {
        console.error('Error Fetching images:', error);
        res.status(500).json({error: 'Failed to fetch images'})
    }
});

//endpoint to upload images
router.post(
  "/upload-images",
  upload.array("images", 25),
  async (req, res) => {
    try {
      const files = req.files;
      const uploadResults = [];

      for (const file of files) {
        const fileContent = fs.readFileSync(file.path);
        const uniqueFileName = `${uuidv4()}-${file.originalname}`;
        const params = {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: uniqueFileName,
          Body: fileContent,
          ContentType: file.mimetype,
        };

        // Upload to S3
        const result = await s3.upload(params).promise();
        const imageUrl = result.Location;

        // Save metadata to the database
        await knex("images").insert({
          name: file.originalname,
          image_url: imageUrl,
        });

        uploadResults.push({
          name: file.originalname,
          url: imageUrl,
        });

        // Delete the file from local storage after upload
        fs.unlinkSync(file.path);
      }

      res.json({ success: true, files: uploadResults });
    } catch (error) {
      console.error("Error uploading images:", error);
      res.status(500).json({ error: "Failed to upload images" });
    }
  }
);

//endpoint to associate images with products 
router.post('/products/:productId/images', async (req,res) => {
    const {productId} = req.params;
    const {imageIds} = req.body; 
    
    try {
        const associations = imageIds.map((imageId) => ({
            product_id: productId,
            image_id: imageId,
        }))

        await knex('product_images').insert(associations)
    } catch (error) {
        console.error('error associating images with products:', error)
        res.status(500).json({error: 'Failed to associate images with product'});
    }
    
})

//endpoint to associate images with collections 

router.post("/collections/:collectionId/images", async (req, res) => {
    const {collectionId} = req.params;
    const {imageIds} = req.body

    try {
        const associations = imageIds.map((imageId) => ({
            collection_id: collectionId,
            image_id: imageId,
        }))

        await knex('collection_images').insert(associations)
    } catch (error) {
        console.error('error associating image with collectino', error);
        res.status(500).json({ error: 'Failed to associate images with collection'})
    }
 })

//Delete image from product

router.delete('/products/:productId/images/:imageId', async (req, res) => {
    const {productId, imageId} = req.params; 

    try {
        await knex('product_images').where({product_id: productId, image_Id: imageId}).del();
        res.json({success: true, message: 'image removed from product successfully'})
    } catch (error) {
        console.error('Error removing image from product', error);
        res.status(500).json({error: 'Failed to remove image from product'})
        
    }
})


//Delete image from collection 
router.delete('/collections/:collectionId/images/:imageId', async (req, res) => {
    const {collectionId, imageId} = req.params; 

    try {
        await knex('collection_images').where({collection_id: collectionId, image_id: imageId}).del();
        res.json({success: true, message: 'image removed from collection successfully'})
    } catch (error) {
        console.error('Error removing image from product', error);
        res.status(500).json({error: 'Failed to remove image from collection'})
        
    }
})

module.exports = router;
