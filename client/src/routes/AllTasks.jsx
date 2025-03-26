import { ImCancelCircle } from "react-icons/im";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { BsInfoSquare } from "react-icons/bs";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { bucketActions } from "../store/bucketSlice";
import { useState } from "react";
import { format } from "date-fns";

const AllTasks = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { bucketId } = location.state || {};
  const buckets = useSelector((state) => state.bucket);

  const [showModal, setShowModal] = useState(false);

  const handleInfoClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const selectedBucket = buckets.find((bucket) => bucket.id === bucketId);

  if (!selectedBucket) {
    return <p className="text-red-500">Bucket not found!</p>;
  }

  const toggleTaskCompletion = (taskId) => {
    dispatch(bucketActions.markTaskCompleted({ bucketId, taskId }));
  };

  const deleteTask = (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      dispatch(bucketActions.deleteTask({ bucketId, taskId }));
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <main className="relative border border-gray-700 rounded-lg w-[95%] max-w-[1000px] min-h-[450px] mt-[60px] mx-auto flex-col bg-gray-900 shadow-xl">
      <IoMdArrowRoundBack
        onClick={handleBackClick}
        className="cursor-pointer text-2xl absolute left-3 top-3 text-gray-400 hover:text-gray-200 transition-colors"
      />
      <BsInfoSquare
        onClick={handleInfoClick}
        className="cursor-pointer text-2xl absolute right-3 top-3 text-gray-400 hover:text-gray-200 transition-colors"
      />
      <div className="flex justify-center items-center h-[60px] bg-gradient-to-r from-indigo-900 to-purple-900 text-gray-100 font-bold text-2xl rounded-t-lg border-b border-gray-700">
        {selectedBucket.title}
      </div>
      <div className="flex flex-col sm:flex-row justify-evenly gap-4 p-4 bg-gray-800/50 backdrop-blur-sm">
        <div className="px-6 py-3 bg-gray-900/80 rounded-xl shadow-lg border border-gray-700 hover:border-gray-600 transition-colors">
          <span className="text-gray-400">Total tasks:</span>
          <span className="ml-2 font-semibold text-gray-200">
            {selectedBucket.tasks.length}
          </span>
        </div>
        <div className="px-6 py-3 bg-gray-900/80 rounded-xl shadow-lg border border-gray-700 hover:border-gray-600 transition-colors">
          <span className="text-gray-400">Task completed:</span>
          <span className="ml-2 font-semibold text-gray-200">
            {selectedBucket.tasks.filter((todo) => todo.completed).length}
          </span>
        </div>
        <div className="px-6 py-3 bg-gray-900/80 rounded-xl shadow-lg border border-gray-700 hover:border-gray-600 transition-colors">
          <span className="text-gray-400">Task pending:</span>
          <span className="ml-2 font-semibold text-gray-200">
            {selectedBucket.tasks.filter((todo) => !todo.completed).length}
          </span>
        </div>
      </div>
      <div className="max-h-[85%] flex flex-col lg:flex-row overflow-y-auto px-4 py-2 gap-4">
        <div className="flex-1 flex flex-col items-center overflow-scroll no-scrollbar">
          <div className="text-white font-bold underline mb-2">
            Pending tasks:
          </div>
          <div className="w-[100%] h-[270px] flex flex-col justify-items-center">
            {selectedBucket.tasks
              .filter((task) => !task.completed)
              .map((task) => (
                <div
                  key={task.id}
                  className="border border-gray-700 rounded-lg w-[80%] flex items-center min-h-[50px] px-4 bg-gray-800 hover:bg-gray-750 transition-colors group mb-4 ml-auto mr-auto"
                >
                  <div className="flex-1 text-gray-300">{task.task}</div>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => toggleTaskCompletion(task.id)}
                      className="p-2 hover:bg-gray-700 rounded-full transition-colors"
                    >
                      <IoCheckmarkDoneSharp className="text-green-400 text-xl hover:text-green-300" />
                    </button>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="p-2 hover:bg-gray-700 rounded-full transition-colors"
                    >
                      <ImCancelCircle className="text-red-400 text-xl hover:text-red-300" />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center overflow-scroll no-scrollbar">
          <div className="text-white font-bold underline mb-2">
            Completed tasks:
          </div>
          <div className="w-[100%] h-[270px] flex flex-col justify-items-center">
            {selectedBucket.tasks
              .filter((task) => task.completed)
              .map((task) => (
                <div
                  key={task.id}
                  className="border border-gray-700 rounded-lg w-[80%] flex items-center min-h-[50px] px-4 bg-gray-800/50 group mb-4 ml-auto mr-auto"
                >
                  <div className="flex-1">
                    <div className="text-gray-400 line-through">
                      {task.task}
                    </div>
                    <div className="text-xs text-gray-500">
                      Completed:{" "}
                      {format(
                        new Date(task.completedAt || Date.now()),
                        "MMM d, yyyy HH:mm"
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => toggleTaskCompletion(task.id)}
                    className="p-2 hover:bg-gray-700 rounded-full transition-colors"
                  >
                    <IoCheckmarkDoneSharp className="text-green-600 text-xl" />
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full mx-4 relative border border-gray-700">
            <button
              onClick={handleCloseModal}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-200"
            >
              <ImCancelCircle />
            </button>
            <h3 className="text-xl font-bold text-gray-200 mb-4">
              Bucket Details
            </h3>
            <div className="text-gray-300">
              <p className="mb-2">
                <span className="font-semibold">Title:</span>{" "}
                {selectedBucket.title}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Description:</span>{" "}
                {selectedBucket.description || "No description available"}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Created:</span>{" "}
                {new Date(selectedBucket.id).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default AllTasks;
