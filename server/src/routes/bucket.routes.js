import express from "express";
import {
  addBucket,
  deleteBucket,
  showBuckets,
  showTasks,
  toggleTaskComplete,
} from "../controllers/bucket.controller.js";

const bucketRoutes = express.Router();

bucketRoutes.route("/todo/api/add-task").post(addBucket);
bucketRoutes.route("/todo/api/:id").delete(deleteBucket);
bucketRoutes.route("/todo/api").get(showBuckets);
bucketRoutes.route("/todo/api/all-tasks/:id").get(showTasks);
bucketRoutes.route("/todo/api/all-tasks/:id").patch(toggleTaskComplete);
bucketRoutes.route("/todo/api/:id").get(showTasks);
bucketRoutes.route("/todo/api/all-tasks/buckets/:id").get(showBuckets);

export { bucketRoutes };
