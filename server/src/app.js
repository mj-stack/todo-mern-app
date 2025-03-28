import express from "express";
import cors from "cors";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Routes import
import { bucketRoutes } from "./routes/bucket.routes.js";

// Routes declaration
app.use(bucketRoutes);

export { app };
