const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require('../utils/validation')

// Get Profile
profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (error) {
    res.status(400).send("Error saving user!" + error.message);
  }
});

// Profile Edit
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if(!validateEditProfileData(req)){
      throw new Error('Invalid Edit Request!!')
    }
    const loggedInUser = req.user;

    Object.keys(req.body).forEach(key => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();

    res.json({ message : `${loggedInUser.firstName}, Your Profile Updated Sucessfully`,
      data : loggedInUser,
    });

  } catch (error) {
    res.status(400).send("ERROR : " + error.message);
  }
})

module.exports = profileRouter;
