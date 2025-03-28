import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      required: true,
    },
    bucket: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bucket",
      required: true,
    },
  },
  { timestamps: true }
);

export const Task = mongoose.model("Task", taskSchema);
