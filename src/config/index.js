import { config } from "dotenv";

config();

export default {
  databaseUrl: process.env.DATABASE_URI,
  port: process.env.PORT || 4000,
  jwtSecret: process.env.JWT_SECRET,
};
