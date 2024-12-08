const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');

// Initialize AWS S3
const s3 = new AWS.S3();

// Set up multer to use S3 storage with public-read permissions
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'loyal6bucket', // Replace with your actual S3 bucket name
    acl: 'public-read', // This sets the permission to public-read
    key: (req, file, cb) => {
      // Use a unique name for each file, or you can adjust the path as needed
      cb(null, `products/${Date.now()}-${path.basename(file.originalname)}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    // Only accept image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  },
});

module.exports = upload;
