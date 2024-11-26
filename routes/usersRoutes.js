const router = require("express").Router();
const jwt = require("jsonwebtoken");
const knex = require("../knexfile");
const db = require("knex")(knex.development);
const crypto = require("crypto"); // Use crypto for hashing
const JWT_SECRET = process.env.JWT_SECRET; // Use an environment variable in production

// Helper function to hash passwords
const hashPassword = (password) => {
  return crypto.createHash("sha256").update(password).digest("hex");
};

// Helper function to compare passwords
const isPasswordMatch = (password, hashedPassword) => {
  return hashPassword(password) === hashedPassword;
};

router
  .get("/", (req, res) => {
    res.send("yo papa");
  })

  .post("/", async (req, res) => {
    const newUser = {
      name: req.body.username,
      password: hashPassword(req.body.password), // Hash the password
      email: req.body.email,
      email_notifications: req.body.email_notifications,
    };

    try {
      await db("users").insert(newUser);
      res.status(201).send("user added");
    } catch (error) {
      console.error("Error adding user:", error); // Log the actual error
      res.status(500).send("Error adding user");
    }
  })

  .post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await db("users").where({ email }).first();
      if (user && isPasswordMatch(password, user.password)) {
        // Add admin status to the token payload
        const token = jwt.sign(
          {
            id: user.id,
            email: user.email,
            admin: user.is_admin, // Include admin status in the payload
          },
          JWT_SECRET,
          { expiresIn: "1h" }
        );
        res.status(200).json({ token });

      } else {
        res.status(401).send("Invalid email or password")

      }
    } catch (error) {
      console.error("Error logging in:", error); // Log the actual error
      res.status(500).send("Error logging in");
    }
  });

module.exports = router;
