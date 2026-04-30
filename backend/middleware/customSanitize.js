const mongoSanitize = require("express-mongo-sanitize");

// Custom sanitize middleware compatible with Express 5
const sanitize = (req, res, next) => {
  // Sanitize query parameters
  if (req.query) {
    req.query = mongoSanitize.sanitize(req.query);
  }
  
  // Sanitize request body
  if (req.body) {
    req.body = mongoSanitize.sanitize(req.body);
  }
  
  next();
};

module.exports = sanitize;
