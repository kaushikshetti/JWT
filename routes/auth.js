const router = require("express").Router();
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const User = require("../../model/user");
const verify = require("./authVerify");

//Signup users
router.post("/signup", async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    username: req.body.username,
    password: hash,
  });

  const saveUser = await user.save();
  res.status(200).send("User created");
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  const validPassword = await bcrypt.compare(req.body.password);

  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(token);
});

router.get("/allUsers", verify, async (req, res) => {
  const results = await User.find().exec();
  res.send(results);
});

module.exports = router;
