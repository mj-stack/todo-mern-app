import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import EmptyBucketDisplay from "./EmptyBucketDisplay";
import { ImCancelCircle } from "react-icons/im";
import { bucketActions } from "../store/bucketSlice";
import { useState } from "react";

const TasksBuckets = () => {
  const navigate = useNavigate();
  const buckets = useSelector((store) => store.bucket);
  const dispatch = useDispatch();

  const handleBucketClick = (bucketId) => {
    navigate("/all-tasks", { state: { bucketId } });
  };

  const handleDeleteClick = (e, bucketId) => {
    e.stopPropagation(); // Prevent bucket navigation when clicking delete
    if (window.confirm("Are you sure you want to delete this bucket?")) {
      dispatch(bucketActions.deleteBucket(bucketId));
    }
  };

  return (
    <div
      className={`${
        buckets.length === 0
          ? "flex justify-center"
          : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      } bg-violet-600 rounded-3xl shadow-2xl w-[95%] max-w-[1000px] p-5 mx-auto mt-8 h-[330px] overflow-y-auto no-scrollbar`}
    >
      {buckets.length === 0 ? (
        <EmptyBucketDisplay />
      ) : (
        buckets.map((bucket) => (
          <div
            key={bucket.id}
            onClick={() => handleBucketClick(bucket.id)}
            className="border-black-700 border-2 rounded-2xl w-[90%] max-w-[200px] h-[200px] mb-4 mx-auto flex-col cursor-pointer transition-all duration-300 hover:translate-y-[-4px] hover:shadow-md relative group"
          >
            <ImCancelCircle
              onClick={(e) => handleDeleteClick(e, bucket.id)}
              className="text-xl text-red-500 opacity-0 group-hover:opacity-100 rounded-2xl absolute right-2 top-2 transition-all duration-300 z-10"
            />
            <div className="bg-black text-white font-bold flex justify-center rounded-t-[10px] flex-1 py-2">
              {bucket.title}
            </div>
            <div className="h-[150px] flex-col justify-items-center items-center flex-5 content-center">
              <p className="font-bold">Total tasks: {bucket.tasks.length}</p>
              <p className="font-bold">
                Completed:{" "}
                {bucket.tasks.filter((todo) => todo.completed).length}
              </p>
              <p className="font-bold">
                Pending: {bucket.tasks.filter((todo) => !todo.completed).length}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TasksBuckets;
