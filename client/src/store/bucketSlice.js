import { createSlice } from "@reduxjs/toolkit";

const bucketSlice = createSlice({
  name: "bucket",
  initialState: [],
  reducers: {
    addBucket: (state, action) => {
      state.push({
        id: String(new Date()),
        title: action.payload.title,
        description: action.payload.description,
        tasks: action.payload.tasks,
      });
    },
    deleteBucket: (state, action) => {
      return state.filter((bucket) => bucket.id !== action.payload);
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
