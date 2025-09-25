import { connect } from "mongoose";

export async function connectDB() {
  const mongoUrl = process.env.MONGO_URL;
  if (!mongoUrl) {
    return console.log("MONGO_URL not defined in environment variables");
  }

  try {
    const DBConnected = await connect(process.env.MONGO_URL as string, {
      dbName: "CODE_SYNC",
      retryWrites: true,
      serverSelectionTimeoutMS: 5000, // fail fast if cluster not reachable
      connectTimeoutMS: 10000, // network/socket timeout
    });
    if (DBConnected) {
      console.log("Successfully connected to DB");
    }
  } catch (error) {
    console.log("Unable to connect mongoDB - ", error);
  }
}
