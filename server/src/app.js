import express from "express";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
dotenv.config({ path: "./.env" });

const allowedOrigins = [
  process.env.FRONTEND_URI,
  "https://todo-mern-app-nu.vercel.app",
];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

// Routes import
import { bucketRoutes } from "./routes/bucket.routes.js";

// Routes declaration
app.use(bucketRoutes);

export { app };
