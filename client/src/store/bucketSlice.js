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
    addTaskToBucket: (state, action) => {
      const { bucketId, task } = action.payload;
    },
  },
});

export const bucketActions = bucketSlice.actions;

export default bucketSlice;
