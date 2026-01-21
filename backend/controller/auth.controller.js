const User = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

// signup
exports.signup = async (req, res) => {
  try {
    // fetch data
    const { name, email, password } = req.body;
    // validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Required all field",
      });
    }
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(401).json({
        success: false,
        message: "User already exist ",
      });
    }
    // hash password
    const hashPassword = await bcrypt.hash(password, 10);
    // create entry in db
    const user = await User.create({
      name,
      email,
      password: hashPassword,
    });
    // return response
    return res.status(201).json({
      success: true,
      message: "user created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something error please try again after some time",
      error: error.message,
    });
  }
};

// login
exports.login = async (req, res) => {
  try {
    // fetch data from the email
    const { email, password } = req.body;
    // validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Required the all feild which is neccessary",
      });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not registered",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(403).json({
        success: false,
        message: "Incorrect password",
      });
    }
    // Geneate token
    const payload = {
      email: user.email,
      id: user._id,
      role: user.role,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    user = user.toObject();
    user.token = token;
    user.password = undefined;
    //  geneate cookies
    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
    return res.cookie("token", token, options).status(200).json({
      success: true,
      token,
      user,
      message: "user logged in successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Somthing went wrong please try again after sometime",
      error: error.message,
    });
  }
};
