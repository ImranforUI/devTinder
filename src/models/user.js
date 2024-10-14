const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema(
  {
    firstName: { type: String, required : true, maxLength: 50, minLenght: 4 },
    lastName: { type: String },
    emailId: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
      time: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email address!");
        }
      },
    }, 
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter Strong Password!");
        }
      },
    },
    age: { type: Number, min: 18 },
    gender: {
      type: String,
      enum : {
        values : ['male', 'female', 'other'],
        message :  `{VALUE} is not a valid gender type`
      },
      // validate(value) {
      //   if (!["male", "female", "others"].includes(value)) {
      //     throw new Error("Gender data is not valid");
      //   }
      // },
    },
    photoUrl: {
      type: String,
      default:
        "https://tse3.mm.bing.net/th?id=OIP.w0TcjC4y9CxTrY3sitYa_AAAAA&pid=Api&P=0&h=180",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Enter valid photo URL!");
        }
      },
    },
    about: {
      type: String,
      default: "This is a default about of the user",
    },
    skills: {
      type: [String],
    },
  },
  { timestamps: true }
);


userSchema.methods.getJWT = async function () {
  const user = this;

  const token = await jwt.sign({ _id : user._id}, "DEV@Tinder@123", {
    expiresIn : "7d"
  });

  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;

  const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);

  return isPasswordValid;
}

module.exports = mongoose.model("User", userSchema);
