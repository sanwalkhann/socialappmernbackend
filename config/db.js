require("dotenv").config();
const mongoose = require("mongoose");
const { MONGO_URL } = process.env;

const connectDB = async () => {
  try {
    const con = await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Database connected on: ${con.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to the database: ${error.message}`);
    process.exit(1);
  }
};

module.exports = { connectDB };
