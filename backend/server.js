require("dotenv").config();

if (!globalThis.crypto) {
  globalThis.crypto = require("node:crypto").webcrypto;
}

const app = require("./app");
const connectDatabase = require("./config/database");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDatabase();

    app.listen(PORT, () => {
     
      console.log(` Server Running : http://localhost:${PORT}`);
      
    });
  } catch (error) {
    console.error("Server Failed To Start:", error);
    process.exit(1);
  }
};

startServer();
