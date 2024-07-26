const express = require("express");
const knex = require("knex");
const knexConfig = require("./knexfile");
const cors = require("cors");
const jwt = require('jsonwebtoken');
const app = express();
const port = process.env.PORT || 3000;

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Use the environment variable in production

// Initialize Knex
const db = knex(knexConfig.development);

// Import routes
const productsRoutes = require("./routes/productsRoutes");
const usersRoutes = require("./routes/usersRoutes");
const checkoutRoutes = require('./routes/checkoutRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  req.db = db;
  next();
});

// Test route
app.get("/", (req, res) => {
  res.send("Welcome to the Storefront API");
});

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

app.use('/checkout', checkoutRoutes);
app.use("/products", productsRoutes);
app.use("/signup", usersRoutes);
app.use("/admin", adminRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
