// index.js

const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const app = express();
const port = process.env.PORT || 3000;

// MongoDB Atlas connection URI
const mongoURI =
  "mongodb+srv://kaushikssgoa:2PyKfi1XDGkTbU4t@cluster0.8ladn2s.mongodb.net/db01?retryWrites=true&w=majority";

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB Atlas:", err);
  });

app.use(express.json());

// Define a sample route that generates a JWT token
app.get("/generate-token", (req, res) => {
  // Replace 'your_secret_key' with a strong secret key
  const secretKey = "your_secret_key";
  const payload = {
    username: "example_user",
  };

  const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });

  res.json({ token });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
