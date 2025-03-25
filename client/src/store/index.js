import { configureStore } from "@reduxjs/toolkit";
import bucketSlice from "./bucketSlice";

const todoStore = configureStore({
  reducer: {
    bucket: bucketSlice.reducer,
  },
});

export default todoStore;
