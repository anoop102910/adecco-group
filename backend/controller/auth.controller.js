const User = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
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
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashPassword,
    });
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

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
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
    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, "token", {
      expiresIn: "2h",
    });

    res.json({ sucess: true, token });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Somthing went wrong please try again after sometime",
      error: error.message,
    });
  }
};
