const jwt = require("jsonwebtoken");

require("dotenv").config();
exports.authMiddlware = (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");

    console.log("token = ", token);
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token misssing",
      });
    }
    try {
      const payload = jwt.verify(token, "secret");
      console.log(payload);
      req.userId = payload.id;
      next();
    } catch (error) {
      console.log(error);
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
