import { ImCancelCircle } from "react-icons/im";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { BsInfoSquare } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { useState } from "react";

const AllTasks = () => {
  const location = useLocation();
  const { bucketId } = location.state || {}; // Get bucketId from location.state
  const buckets = useSelector((state) => state.bucket);

  // Find the specific bucket using bucketId
  const selectedBucket = buckets.find((bucket) => bucket.id === bucketId);

  if (!selectedBucket) {
    return <p className="text-red-500">Bucket not found!</p>;
  }

  const toggleTaskCompletion = (selectedTask) => {
    setDisplayTask((prevTasks) =>
      prevTasks.map((task) =>
        task === selectedTask ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <main className="relative border border-gray-700 rounded-lg max-w-[1000px] h-[450px] mt-[60px] mx-auto flex-col bg-gray-900 shadow-xl">
      <BsInfoSquare className="cursor-pointer text-2xl absolute right-3 top-3 text-gray-400 hover:text-gray-200 transition-colors" />
      <div className="flex justify-center items-center h-[60px] bg-gradient-to-r from-indigo-900 to-purple-900 text-gray-100 font-bold text-2xl rounded-t-lg border-b border-gray-700">
        {selectedBucket.title}
      </div>
      <div className="flex justify-evenly py-4 bg-gray-800">
        <div className="px-4 py-2 bg-gray-900 rounded-lg shadow-lg border border-gray-700">
          <span className="text-gray-400">Total tasks:</span>
          <span className="ml-2 font-semibold text-gray-200">
            {selectedBucket.tasks.length}
          </span>
        </div>
        <div className="px-4 py-2 bg-gray-900 rounded-lg shadow-lg border border-gray-700">
          <span className="text-gray-400">Task completed:</span>
          <span className="ml-2 font-semibold text-gray-200">
            {selectedBucket.tasks.filter((todo) => todo.completed).length}
          </span>
        </div>
        <div className="px-4 py-2 bg-gray-900 rounded-lg shadow-lg border border-gray-700">
          <span className="text-gray-400">Task pending:</span>
          <span className="ml-2 font-semibold text-gray-200">
            {selectedBucket.tasks.filter((todo) => !todo.completed).length}
          </span>
        </div>
      </div>
      <div className="max-h-[85%] flex overflow-y-auto px-4 py-2 gap-2">
        <div className="flex-1/2 flex flex-col items-center overflow-scroll no-scrollbar">
          <div className="text-white font-bold underline mb-2">
            Pending tasks:
          </div>
          <div className="w-[100%] h-[270px] grid grid-cols-1 justify-items-center">
            {selectedBucket.tasks.map((task, index) => (
              <div
                key={index}
                className="border border-gray-700 rounded-lg w-[80%] flex items-center h-[50px] px-4 bg-gray-800 hover:bg-gray-750 transition-colors group mb-4"
              >
                <div className="flex-1 text-gray-300">{task.task}</div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => toggleTaskCompletion(task)}
                    className="p-2 hover:bg-gray-700 rounded-full transition-colors"
                  >
                    <IoCheckmarkDoneSharp className="text-green-400 text-xl hover:text-green-300" />
                  </button>
                  <button className="p-2 hover:bg-gray-700 rounded-full transition-colors">
                    <ImCancelCircle className="text-red-400 text-xl hover:text-red-300" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1/2 flex flex-col items-center">
          <div className="text-white font-bold underline mb-2">
            Completed tasks:
          </div>
          <div></div>
        </div>
      </div>
    </main>
  );
};

export default AllTasks;
