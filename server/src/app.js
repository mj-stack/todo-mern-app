import express from "express";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
dotenv.config({ path: "./.env" });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URI }));

// Routes import
import { bucketRoutes } from "./routes/bucket.routes.js";

// Routes declaration
app.use(bucketRoutes);

export { app };
