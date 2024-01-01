const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const con = await mongoose.connect(`${process.env.MONGO_URL}`, { useNewUrlParser: true,
      useUnifiedTopology: true,});
    console.log(`database is connected on : ${con.connection.host}`);
  } catch (error) {
    console.log(`Oops! database is not connected`);
    process.exit(1);
  }
};

module.exports = connectDB;
