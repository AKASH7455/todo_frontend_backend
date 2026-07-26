const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const todoRoutes = require("./routes/todoRoutes");

const app = express();

// Security
app.use(helmet());

// Compression
app.use(compression());

// Request Logger
app.use(morgan("dev"));

// CORS
app.use(
  cors({
    origin: [
      "https://todo-frontend-backend-liart.vercel.app",
      "https://todofrontendbackend-production.up.railway.app",
      "http://localhost:5173",
      "http://localhost:3000",
    ],
    credentials: true,
  })
);

// this is home ho server//


app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Todo API  server is running now ",
  });
});
// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookies
app.use(cookieParser());

// Home Route
app.use("/api/todos", todoRoutes);

module.exports = app;
