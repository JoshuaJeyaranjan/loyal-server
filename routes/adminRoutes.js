const express = require('express');
const router = express.Router();
const { isAdmin } = require('../middleware/auth');

// router.post('/inventory', isAdmin, async (req, res) => {
//   // Logic to add inventory item
// });

// router.put('/inventory/:id', isAdmin, async (req, res) => {
//   // Logic to update inventory item
// });

// router.delete('/inventory/:id', isAdmin, async (req, res) => {
//   // Logic to delete inventory item
// });

// router.get('/users', isAdmin, async (req, res) => {
//   // Logic to get list of users
// });

module.exports = router;
