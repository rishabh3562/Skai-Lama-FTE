const mongoose = require("mongoose");
// const colors = require("colors");

const uri = process.env.MONGO_URI;
// console.log(uri);
const options= {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(uri)

    console.log(`MongoDB Connected `);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit();
  }
};

module.exports = connectDB;
