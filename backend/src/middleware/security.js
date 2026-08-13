const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
const mongoSanitize = require('express-mongo-sanitize');

module.exports = (app) => {
  // Set security HTTP headers
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"],
      },
    },
  }));

  // Prevent XSS attacks
  app.use(xss());

  // Prevent HTTP Parameter Pollution
  app.use(hpp());

  // Data sanitization against NoSQL injection
  app.use(mongoSanitize());
};