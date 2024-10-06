const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const { validationSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const app = express();

app.use(express.json());

// Creating a User
app.post("/signup", async (req, res) => {
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
app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      res.send("Login successfully...");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    res.status(400).send("Error saving user!" + error.message);
  }
});

// Get user by emailId
app.get("/user", async (req, res) => {
  const Useremail = req.body.emailId;
  try {
    const users = await User.findOne({ emailId: Useremail });
    if (users.length === 0) {
      res.send(404).send("User not found!");
    } else {
      res.send(users);
    }
  } catch (error) {
    res.status(400).send("Somthing went wrong!");
  }
});

// Feed API - Get /feed - get all the users from database
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.send(400).send("Somthing went wrong!");
  }
});

// Delete a user from database
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      res.status(404).send("User not found!");
    } else {
      res.send("User deleted successfully...");
    }
  } catch (error) {
    res.status(400).send("Somthing went wrong!");
  }
});

// update a user from database
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params.userId;
  const data = req.body;
  try {
    const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }
    if (data?.skills.length > 10) {
      throw new Error("Skills cannot be more than 10");
    }
    if (data?.age < 18) {
      throw new Error("Age must be 18 or above");
    }
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });
    console.log(user);
    res.send("User Updated Successfully...");
  } catch (error) {
    res.status(400).send("Somthing went wrong!");
  }
});

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
