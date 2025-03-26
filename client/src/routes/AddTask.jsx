import { LuNotebookText } from "react-icons/lu";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { FaTasks } from "react-icons/fa";
import { MdAddTask } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa";
import { Form, useNavigate } from "react-router";
import Tasks from "../components/Tasks";
import { useDispatch } from "react-redux";
import { useRef, useState } from "react";
import { bucketActions } from "../store/bucketSlice";

const AddTask = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [displayTask, setDisplayTask] = useState([]);

  const bucketTitle = useRef();
  const bucketDescription = useRef();
  const bucketTask = useRef();

  const handleAddBucket = (e) => {
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

    dispatch(
      bucketActions.addBucket({ title, description, tasks: [...displayTask] })
    );

    // Reset fields
    bucketTitle.current.value = "";
    bucketDescription.current.value = "";
    setDisplayTask([]);
    navigate("/");
  };

  const handleAddTask = (e) => {
    e.preventDefault();

    const taskValue = bucketTask.current.value.trim();
    if (!taskValue) return; // Prevent adding empty tasks

    // Update state with the new task
    setDisplayTask((prevTasks) => [
      ...prevTasks,
      { task: taskValue, completed: false },
    ]);
    console.log(displayTask);
    bucketTask.current.value = ""; // Clear input field
  };

  return (
    <main className="border-2 border-black max-w-[1000px] h-[450px] mt-[60px] mr-auto ml-auto relative">
      <button
        onClick={() => navigate("/")}
        className="flex justify-between items-center absolute left-[-15px] top-[-15px] bg-gray-800 text-white p-2 rounded-3xl cursor-pointer transition-transform duration-200 hover:scale-120"
      >
        <FaArrowLeft />
      </button>
      <Form method="POST" className="h-auto w-[100%] flex flex-col">
        <div className="flex justify-center font-bold text-2xl mb-4">
          <h3>Create a bucket list</h3>
        </div>
        <div className="ml-8 mr-8">
          <label>
            <LuNotebookText className="mb-2 ml-2" />
          </label>
          <input
            required
            ref={bucketTitle}
            type="text"
            placeholder="Your bucket heading"
            className="bg-purple-700 placeholder:text-black placeholder:font-bold text-[16px] pl-4 font-bold shadow-2xl rounded-3xl w-[400px] mb-6 p-2 outline-0"
          />

          <label>
            <HiOutlinePencilSquare className="mb-2 ml-2" />
          </label>
          <input
            ref={bucketDescription}
            type="text"
            placeholder="Description (optional)"
            className="bg-purple-700 placeholder:text-black placeholder:font-bold text-[16px] pl-4 font-bold shadow-2xl rounded-3xl w-[400px] mb-6 p-2 outline-0"
          />

          <label className="flex w-[100%] items-center">
            <FaTasks className="mb-3 ml-3" />
            <button
              onClick={handleAddTask}
              title="Add task"
              className="ml-[870px] mb-1 bg-gray-900 p-2 text-white rounded-3xl cursor-pointer "
            >
              <MdAddTask />
            </button>
          </label>
          <input
            ref={bucketTask}
            type="text"
            placeholder="Add your tasks"
            className="bg-purple-700 placeholder:text-black placeholder:font-bold text-[16px] pl-4 font-bold shadow-2xl rounded-3xl w-[100%] mb-6 p-2 outline-0"
          />
        </div>
        <button
          title="Create new bucket"
          onClick={handleAddBucket}
          type="submit"
          className="flex justify-between items-center absolute right-[-15px] top-[-15px] bg-gray-800 text-white p-2 rounded-3xl cursor-pointer"
        >
          <IoMdAdd />
        </button>
      </Form>
      <Tasks displayTask={displayTask} setDisplayTask={setDisplayTask} />
    </main>
  );
};

export default AddTask;
