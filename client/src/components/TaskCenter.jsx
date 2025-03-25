import { IoIosAddCircle } from "react-icons/io";
import TasksBuckets from "./TasksBuckets";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

const TaskCenter = () => {
  const navigate = useNavigate();
  const buckets = useSelector((state) => state.bucket);

  return (
    <main className="max-w-[1000px] h-[450px] mt-[60px] mr-auto ml-auto">
      <div className="flex">
        <button
          onClick={() => navigate("/add-task")}
          className="bg-gray-800 text-white font-bold cursor-pointer pt-[8px] pb-[8px] pl-[15px] pr-[15px] rounded-2xl flex justify-center items-center ml-[100px] mt-4 transition-transform duration-200 hover:opacity-90"
        >
          <IoIosAddCircle className="mr-2" /> Add a new task bucket
        </button>
        <div className="ml-[410px] mt-4 text-2xl font-bold">
          Total buckets: {buckets.length}
        </div>
      </div>
      <TasksBuckets />
    </main>
  );
};

export default TaskCenter;
