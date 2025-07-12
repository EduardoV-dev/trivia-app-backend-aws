import process from "process";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import compression from "compression";
import ensureInitialData from "./import";
import apiRouter from "./api";

const app = express();
app.use(compression());
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
  }),
);
app.use(express.urlencoded());

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

const mongoDbUri =
  process.env.MONGODB_URI || "mongodb://localhost:27017/trivia";
console.log(mongoDbUri);
const db = mongoose.connect(mongoDbUri, {
  connectTimeoutMS: 30000,
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 45000,
  maxPoolSize: 10,
  retryWrites: true,
  maxIdleTimeMS: 30000,
  family: "ipv4",
});
db.catch((err) => {
  console.log(`Failed to connect to mongodb: ${mongoDbUri}`);
  console.log(err);
  process.exit(1);
});

ensureInitialData();

app.use("/api", apiRouter);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

