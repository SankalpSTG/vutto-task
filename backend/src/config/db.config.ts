import mongoose from "mongoose";

const mongoUri: string = process.env.MONGO_URI || "";

const connectionOptions: any = {
  bufferCommands: false,
};

export const connectDatabase = async () => {
  if (mongoose.connection.readyState === 1) {
    return;
  }
  try {
    await mongoose.connect(mongoUri, connectionOptions);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};
