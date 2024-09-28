const winston = require("winston");
const { format, transports } = require("winston");
require("winston-daily-rotate-file");

// Custom log format function to align timestamp, request type, route, and response time
const customFormat = format.printf(({ level, message, timestamp }) => {
  const [method, route, responseTime] = message.split(" "); // Split the log message

  // Define a maximum length for the route and response time
  const maxRouteLength = 30; // Change this value to control width
  const paddedMethod = method.padEnd(6, " "); // Pad method for alignment
  const paddedRoute = route.padEnd(maxRouteLength, "."); // Pad route with dots
  const paddedResponseTime = responseTime.padStart(10, " "); // Pad response time

  return `${timestamp} ${paddedMethod} ${paddedRoute} ~ ${paddedResponseTime}`;
});

// Create logger with daily rotation
const logger = winston.createLogger({
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    customFormat // Custom formatting function
  ),
  transports: [
    new transports.Console(),
    new transports.DailyRotateFile({
      filename: "logs/application-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      maxSize: "20m",
      maxFiles: "14d",
      zippedArchive: true,
    }),
  ],
});

module.exports = logger;
