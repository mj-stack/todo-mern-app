import { IoIosAddCircle } from "react-icons/io";
import TasksBuckets from "./TasksBuckets";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

const TaskCenter = () => {
  const navigate = useNavigate();
  const buckets = useSelector((state) => state.bucket);

  return (
    <main className="max-w-[1000px] w-[95%] h-[450px] mt-[60px] mx-auto">
      <div className="flex flex-col sm:flex-row sm:justify-between px-4 sm:px-0">
        <button
          onClick={() => navigate("/add-task")}
          className="bg-gray-800 text-white font-bold cursor-pointer py-2 px-4 rounded-2xl flex justify-center items-center mb-4 sm:mb-0 transition-transform duration-200 hover:opacity-90 w-full sm:w-auto"
        >
          <IoIosAddCircle className="mr-2" /> Add a new task bucket
        </button>
        <div className="text-center sm:text-right text-xl sm:text-2xl font-bold">
          Total buckets: {buckets.length}
        </div>
      </div>
      <TasksBuckets />
    </main>
  );
};

export default TaskCenter;
