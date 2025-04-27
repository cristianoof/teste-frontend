import mongoose from "mongoose";

export async function connectToDatabase(): Promise<void> {
  try {
    const dbUri = process.env.MONGO_URI || "mongodb://localhost:27017/theosDB";

    await mongoose.connect(dbUri);

    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }
}
