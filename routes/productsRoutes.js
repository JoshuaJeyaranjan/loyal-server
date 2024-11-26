const router = require("express").Router();
const knex = require('../knexfile');
const db = require('knex')(knex.development);

// Public route to get all products
router.get("/", async (req, res) => {
  try {
    const products = await db("products").select("*");
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching products");
  }
});

// Public route to get bestsellers
router.get("/bestsellers", async (req, res) => {
  try {
    const bestsellers = await db("products").where("bestseller", true).select("*");

    if (bestsellers.length > 0) {
      res.json(bestsellers);
    } else {
      res.status(404).send("No bestsellers found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching bestsellers");
    console.error("Error fetching bestsellers:", error.message, error.stack);
  }
});

// Public route to get a single product by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await db("products").where({ id }).first();
    if (product) {
      res.json(product);
    } else {
      res.status(404).send("Product not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching product");
  }
});

module.exports = router;
