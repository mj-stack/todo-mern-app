import axios from "axios";
import { LuNotebookText } from "react-icons/lu";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { FaTasks } from "react-icons/fa";
import { MdAddTask } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa";
import { Form, useLocation, useNavigate } from "react-router";
import Tasks from "../components/Tasks";
import { useDispatch } from "react-redux";
import { useRef, useState, useEffect } from "react";
import { bucketActions } from "../store/bucketSlice";
import { IoIosSave } from "react-icons/io";

const AddTask = () => {
  const apiUrl = import.meta.env.VITE_BACKEND_URI;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [displayTask, setDisplayTask] = useState([]);

  const bucketTitle = useRef();
  const bucketDescription = useRef();
  const bucketTask = useRef();
  const location = useLocation();
  const {
    fillBucketId,
    fillBucketTitle,
    fillBucketDescription,
    fillBucketTasks,
  } = location.state || {};

  useEffect(() => {
    if (fillBucketId) {
      bucketTitle.current.value = fillBucketTitle || "";
      bucketDescription.current.value = fillBucketDescription || "";
      setDisplayTask(fillBucketTasks || []);
    }
  }, [fillBucketId, fillBucketTitle, fillBucketDescription, fillBucketTasks]);

  const handleAddBucket = async (e) => {
    e.preventDefault();

    const title = bucketTitle.current.value.trim();
    const description = bucketDescription.current.value.trim();

    if (!title) {
      alert("Please provide a bucket title.");
      return;
    } else if (displayTask.length === 0) {
      alert("Add at least one task");
      return;
    }

    if (fillBucketId) {
      dispatch(
        bucketActions.updateBucket({
          id: fillBucketId,
          title,
          description,
          tasks: [...displayTask],
        })
      );
    }

    const bucket = {
      title,
      description,
      tasks: displayTask,
    };

    try {
      const response = await axios.post(`${apiUrl}/add-task`, bucket);
    } catch (error) {
      console.error("Error sending data:", error);
    }

    bucketTitle.current.value = "";
    bucketDescription.current.value = "";
    setDisplayTask([]);
    navigate("/");
  };

  const handleAddTask = (e) => {
    e.preventDefault();

    const taskValue = bucketTask.current.value.trim();
    if (!taskValue) return;

    setDisplayTask((prevTasks) => {
      const updatedTasks = [
        ...prevTasks,
        { task: taskValue, completed: false, id: String(new Date()) },
      ];
      return updatedTasks;
    });
    bucketTask.current.value = "";
  };

  return (
    <main className="bg-gray-900 w-[90%] max-w-[1000px] max-h-[600px] mt-[60px] mx-auto relative p-8 rounded-2xl shadow-2xl text-white">
      <button
        onClick={() => navigate("/")}
        className="flex justify-between items-center absolute left-[-15px] top-[-15px] bg-purple-700 hover:bg-purple-600 text-white p-3 rounded-xl cursor-pointer transition-all duration-300 shadow-lg"
      >
        <FaArrowLeft />
      </button>
      <Form method="POST" className="w-full flex flex-col">
        <div className="flex justify-center font-bold text-xl sm:text-3xl mb-8">
          <h3 className="text-purple-400">Create a bucket list</h3>
        </div>
        <div className="w-full px-2 sm:px-8">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <label>
                <LuNotebookText className="mb-2 ml-2" />
              </label>
              <input
                required
                maxLength="10"
                ref={bucketTitle}
                type="text"
                placeholder="Your bucket heading"
                className="bg-gray-800 placeholder:text-gray-400 text-[16px] pl-4 font-medium shadow-lg rounded-xl w-full p-3 outline-none border-2 border-purple-700 focus:border-purple-500 transition-all"
              />
            </div>
            <div className="flex-1">
              <label>
                <HiOutlinePencilSquare className="mb-2 ml-2" />
              </label>
              <input
                ref={bucketDescription}
                type="text"
                placeholder="Description (optional)"
                className="bg-gray-800 placeholder:text-gray-400 text-[16px] pl-4 font-medium shadow-lg rounded-xl w-full p-3 outline-none border-2 border-purple-700 focus:border-purple-500 transition-all"
              />
            </div>
          </div>

          <div className="relative w-full mb-6">
            <label className="flex items-center mb-2">
              <FaTasks className="ml-3" />
            </label>
            <div className="flex gap-2">
              <input
                ref={bucketTask}
                type="text"
                placeholder="Add your tasks"
                className="bg-gray-800 placeholder:text-gray-400 text-[16px] pl-4 font-medium shadow-lg rounded-xl flex-1 p-3 outline-none border-2 border-purple-700 focus:border-purple-500 transition-all"
              />
              <button
                onClick={handleAddTask}
                title="Add task"
                className="bg-purple-700 hover:bg-purple-600 p-3 px-6 text-white rounded-xl cursor-pointer transition-all duration-300 shadow-lg"
              >
                <MdAddTask className="text-xl" />
              </button>
            </div>
          </div>
        </div>
        <button
          title={`${fillBucketId ? "Save edits" : "Create new bucket"}`}
          onClick={handleAddBucket}
          type="submit"
          className="flex justify-between items-center absolute right-[-15px] top-[-15px] bg-purple-700 hover:bg-purple-600 text-white p-3 rounded-xl cursor-pointer transition-all duration-300 shadow-lg"
        >
          {fillBucketId ? (
            <IoIosSave className="text-xl" />
          ) : (
            <IoMdAdd className="text-xl" />
          )}
        </button>
      </Form>
      <Tasks displayTask={displayTask} setDisplayTask={setDisplayTask} />
    </main>
  );
};

export default AddTask;
