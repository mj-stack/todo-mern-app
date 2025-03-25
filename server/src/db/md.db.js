import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`);
    console.log("DB connected");
  } catch (error) {
    console.log("Error connecting MongoDB", error);
  }
};

export { connectDB };
