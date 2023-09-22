const router = require("express").Router();
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const User = require("../model/user");

//Signup users
router.post("/signup",async(req,res)=>{
    const salt=await bcrypt.genSalt(10);
    const hash=await bcrypt.hash(req.body.password,salt);

    const user=new User({
          username:req.body.username,
          password:hash
    })

    const saveUser=await user.save()
    res.status(200).send("User created");
})

module.exports = router;
