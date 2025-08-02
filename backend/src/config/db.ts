import { connect } from "mongoose";
import { MONGO_URI } from "../constants/env";

export const connectDB = async () => {
  try {
    await connect(MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (err: any) {
    throw new Error(`Couldn't connect to DB: ${err.message}`);
    process.exit(1);
  }
};
