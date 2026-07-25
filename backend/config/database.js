const mongoose = require("mongoose");

const connectDatabase = async () => {
  if (!process.env.MONGO_URI) {
    console.warn("MONGO_URI not found in .env file. Skipping database connection.");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB Connection Failed");
    console.error(error.message);

    // Don't exit process, just log the error
    console.warn("Server will continue running without database connection");
  }
};

module.exports = connectDatabase;