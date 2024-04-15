import mongoose from "mongoose";
import { config as dotenvConfig } from "dotenv";

dotenvConfig();

const connection = mongoose.connect(process.env.MONGODB_URL);

export { connection };
