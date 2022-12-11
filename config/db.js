const mongoose = require("mongoose");
const connString = process.env.DATABASE_CONNECTION;
const connectDB = async () => {
  try {
    await mongoose.connect(connString, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Connection Sucessful");
  } catch (error) {
    console.log("Connection not Sucessful");
    console.log(error);
    process.exit(1);
  }
};
module.exports = connectDB;
