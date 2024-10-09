const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");

// Get Profile
profileRouter.get("/profile", userAuth, async (req, res) => {
    console.log("Start...")
  try {
    const user = req.user;

    res.send(user);
  } catch (error) {
    res.status(400).send("Error saving user!" + error.message);
  }
});

module.exports = profileRouter;
