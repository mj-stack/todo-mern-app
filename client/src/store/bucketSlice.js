import { createSlice } from "@reduxjs/toolkit";

const bucketSlice = createSlice({
  name: "bucket",
  initialState: [],
  reducers: {
    addBucket: (state, action) => {
      state.push({
        id: action.payload._id,
        title: action.payload.title,
        description: action.payload.description,
        tasks: action.payload.tasks,
      });
    },
    setBuckets: (state, action) => {
      return action.payload.map((bucket) => ({
        id: bucket._id,
        title: bucket.title,
        description: bucket.description,
        tasks: bucket.tasks,
      }));
    },
    deleteBucket: (state, action) => {
      return state.filter((bucket) => bucket.id !== action.payload);
    },
    deleteTask: (state, action) => {
      const { bucketId, taskId } = action.payload;
      console.log(bucketId);
      const bucket = state.find((bucket) => bucket.id === bucketId);
      bucket.tasks = bucket.tasks.filter((task) => task.id !== taskId);
      // return newBucket;
    },
    updateBucket: (state, action) => {
      const { id, title, description, tasks } = action.payload;
      const bucket = state.find((bucket) => bucket.id === id);
      if (bucket) {
        bucket.title = title;
        bucket.description = description;
        bucket.tasks = tasks;
      }
    },
    markTaskCompleted: (state, action) => {
      const { bucketId, taskId } = action.payload;
      const bucket = state.find((b) => b.id === bucketId);
      if (bucket) {
        const task = bucket.tasks.find((t) => t.id === taskId);
        if (task) {
          task.completed = !task.completed;
        }
      }
    },
  },
});

export const bucketActions = bucketSlice.actions;

export default bucketSlice;
