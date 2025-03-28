import mongoose from "mongoose";
import { Task } from "./task.model.js";

const bucketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
  },
  { timestamps: true }
);

bucketSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    try {
      console.log("Deleting tasks for bucket:", this._id);
      await Task.deleteMany({ _id: { $in: this.tasks } });
      next();
    } catch (error) {
      next(error);
    }
  }
);

export const Bucket = mongoose.model("Bucket", bucketSchema);
