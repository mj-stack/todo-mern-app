import { Bucket } from "../models/bucket.model.js";
import { Task } from "../models/task.model.js";

const addBucket = async (req, res) => {
  const { title, description, tasks } = req.body;
  console.log(title, description, tasks);

  try {
    const bucket = await Bucket.create({ title, description });

    const tasksWithBucketId = tasks.map((taskObj) => ({
      task: taskObj.task,
      completed: taskObj.completed,
      id: taskObj.id,
      bucket: bucket._id,
    }));

    const createdTasks = await Task.insertMany(tasksWithBucketId);

    const taskIds = createdTasks.map((task) => task._id);

    await Bucket.findByIdAndUpdate(bucket._id, {
      $push: { tasks: taskIds },
    });

    await Bucket.findById(bucket._id).populate("tasks");

    res.status(201).json({
      message: "Bucket and tasks created successfully",
      bucket,
      tasks: createdTasks,
    });
  } catch (error) {
    console.error("Error adding bucket and tasks:", error);
    res.status(500).json({ error: error.message });
  }
};

const deleteBucket = async (req, res) => {
  try {
    const bucketId = req.params.id;

    const bucket = await Bucket.findById(bucketId);
    if (!bucket) {
      return res.status(404).json({ message: "Bucket not found" });
    }

    await bucket.deleteOne();
    res
      .status(200)
      .json({ message: "Bucket and its tasks deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const showTasks = async (req, res) => {
  const bucketId = req.params.id;
  const tasks = await Task.find({ bucket: bucketId });
  res.status(201).json({ tasks });
};

const showBuckets = async (req, res) => {
  try {
    if (req.params.id) {
      const bucket = await Bucket.findById(req.params.id);

      if (!bucket) {
        return res.status(404).json({ error: "Bucket not found" });
      }

      return res.status(200).json({ data: bucket });
    }

    const buckets = await Bucket.find();
    console.log(buckets);
    res.status(200).json({ data: buckets });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch buckets", details: error.message });
  }
};

const toggleTaskComplete = async (req, res) => {
  const taskId = req.params.id;
  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { completed: !task.completed },
      { new: true }
    );

    res.status(200).json({ updatedTask });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Failed to toggle task completion" });
  }
};

export { addBucket, deleteBucket, showBuckets, showTasks, toggleTaskComplete };
