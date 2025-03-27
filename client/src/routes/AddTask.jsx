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

    if (fillBucketId) {
      dispatch(
        bucketActions.updateBucket({
          id: fillBucketId,
          title,
          description,
          tasks: [...displayTask],
        })
      );
    } else {
      dispatch(
        bucketActions.addBucket({ title, description, tasks: [...displayTask] })
      );
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
    <main className="border-2 border-black w-[80%] max-w-[1000px] max-h-[450px] mt-[60px] mx-auto relative p-4">
      <button
        onClick={() => navigate("/")}
        className="flex justify-between items-center absolute left-[-15px] top-[-15px] bg-gray-800 text-white p-2 rounded-3xl cursor-pointer transition-transform duration-200 hover:scale-120"
      >
        <FaArrowLeft />
      </button>
      <Form method="POST" className="w-full flex flex-col">
        <div className="flex justify-center font-bold text-xl sm:text-2xl mb-4">
          <h3>Create a bucket list</h3>
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
                className="bg-purple-700 placeholder:text-black placeholder:font-bold text-[16px] pl-4 font-bold shadow-2xl rounded-3xl w-full p-2 outline-0"
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
                className="bg-purple-700 placeholder:text-black placeholder:font-bold text-[16px] pl-4 font-bold shadow-2xl rounded-3xl w-full p-2 outline-0"
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
                className="bg-purple-700 placeholder:text-black placeholder:font-bold text-[16px] pl-4 font-bold shadow-2xl rounded-3xl flex-1 p-2 outline-0 w-fit"
              />
              <button
                onClick={handleAddTask}
                title="Add task"
                className="bg-gray-900 p-2 pl-6 pr-6 text-white rounded-3xl cursor-pointer"
              >
                <MdAddTask />
              </button>
            </div>
          </div>
        </div>
        <button
          title={`${fillBucketId ? "Save edits" : "Create new bucket"}`}
          onClick={handleAddBucket}
          type="submit"
          className="flex justify-between items-center absolute right-[-15px] top-[-15px] bg-gray-800 text-white p-2 rounded-3xl cursor-pointer"
        >
          {fillBucketId ? <IoIosSave /> : <IoMdAdd />}
        </button>
      </Form>
      <Tasks displayTask={displayTask} setDisplayTask={setDisplayTask} />
    </main>
  );
};

export default AddTask;
