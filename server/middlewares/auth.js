//const config = require('../config/configs');
const messages = require("../config/messages");
const jwt = require("jsonwebtoken");

function auth(request, response, next) {
  const authHeader = request.header("Authorization");

  // Check for token
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return response
      .status(401)
      .json({ success: false, msg: messages.AUTH_NO_TOKEN });
  }

  // Extract the token from the header
  const token = authHeader.split(" ")[1];

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Add User from payload
    request.user = decoded;
    next();
  } catch (exception) {
    response
      .status(401)
      .json({ success: false, msg: messages.AUTH_TOKEN_NOT_VALID + exception });
  }
}

module.exports = auth;
