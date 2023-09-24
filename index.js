// index.js

const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const app = express();
const cors=require("cors")
const port = process.env.PORT || 3000;

const authRoute = require("./routes/auth/auth");
const authDashboard=require("./routes/auth/authDashboard")


dotenv.config();
mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB Atlas:", err);
  });

app.use(express.json(),cors());
app.use("/api/users", authRoute);
app.use("/api/dashboard",authDashboard);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
