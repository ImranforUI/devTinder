const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();

app.use(express.json());

app.post('/signup', async (req, res) => {
  // Creating a new instance of the User model
  const user = new User(req.body);

  try {
    await user.save();
    res.send("User Added Successfully...");
  } catch (error) {
    res.status(400).send("Error saving user!!", err.message);
  }
})

// Get user by emailId
app.get('/user', async (req, res) => {
  const Useremail = req.body.emailId;
  try {
    const users = await User.findOne({emailId : Useremail});
    if(users.length === 0){
      res.send(404).send("User not found!");
    }else{
      res.send(users); 
    }
  } catch (error) {
    res.status(400).send("Somthing went wrong!");
  }
});

// Feed API - Get /feed - get all the users from database
app.get('/feed', async (req, res) => {
  try {
    const users = await User.find({});
   res.send(users); 
  } catch (err) {
    res.send(400).send("Somthing went wrong!");
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
