const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { validationSignUpData } = require("../utils/validation");

// Creating a User
authRouter.post("/signup", async (req, res) => {
  try {
    // Validation of User
    validationSignUpData(req);

    const { firstName, lastName, emailId, password } = req.body;
    // Encrypting Password
    const passwordHash = await bcrypt.hash(password, 10);

    // Creating a new instance of the User model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.send("User Added Successfully...");
  } catch (error) {
    res.status(400).send("Error saving user!" + error.message);
  }
});

// Login Api
authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      // Create JWT token
      const token = await user.getJWT();

      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });

      res.send("Login successfully...");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    res.status(400).send("Error:" + error.message);
  }
});


// Logout API
authRouter.post('/logout', async (req, res) => {
  res.cookie("token", null , {
    expires : new Date(Date.now()),
  });
  res.send("Logout Successfully!!")
})

module.exports = authRouter;
