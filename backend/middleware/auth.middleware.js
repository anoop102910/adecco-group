const jwt = require("jsonwebtoken");
const user = require("../model/user.model");

require("dotenv").config();
exports.auth = (req, res, next) => {
  try {
    // extraxt token
    const token =
      req.body.token || req.cookies.token || req.header("Authorization").replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token misssing",
      });
    }
    // verify token
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      console.log(payload);
      req.user = payload;
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "somethings wrong while verify the token",
    });
  }
};
