import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./routes/App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import AddTask from "./routes/AddTask.jsx";
import TaskCenter from "./components/TaskCenter.jsx";
import AllTasks from "./routes/AllTasks.jsx";
import { Provider } from "react-redux";
import todoStore from "./store/index.js";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <TaskCenter /> },
      { path: "/add-task", element: <AddTask /> },
      { path: "/all-tasks", element: <AllTasks /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={todoStore}>
      <RouterProvider router={router} />
      <Analytics />
      <SpeedInsights />
    </Provider>
  </StrictMode>
);
