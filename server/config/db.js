import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("URI:", process.env.MONGODB_URI);

    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log("MongoDB Connected");
  } catch (error) {
    console.error("Full Error:");
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;