const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();



app.post('/signup', async (req, res) => {
  // Creating a new instance of the User model
  const user = new User({
    firstName : 'Aamer',
    lastName : 'Khan',
    emailId : 'aamer@khan.com',
    password : "Aamer@123"
  });

  try {
    await user.save();
    res.send("User Added Successfully...");
  } catch (error) {
    res.status(400).send("Error saving user!!", err.message);
  }
})

connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(7777, () => {
      console.log("Server is running successfully on the port 7777...");
    });
  })
  .catch((err) => {
    console.err("Database cannot be connected!!");
  });
