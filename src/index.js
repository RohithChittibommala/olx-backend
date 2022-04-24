import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import config from "./config/index.js";
import routes from "./routes.js";

const app = express();

app.use(express.json());
app.use(cors());

const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(config.databaseUrl, mongooseOptions)
  .then(() => {
    app.listen(config.port, () => {
      routes(app);
      console.log(`Server is running on port ${config.port}`);
    });
  })
  .catch((er) => {
    console.log("Error connecting to database", er);
  });
