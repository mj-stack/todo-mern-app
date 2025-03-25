import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import EmptyBucketDisplay from "./EmptyBucketDisplay";

const TasksBuckets = () => {
  const navigate = useNavigate();
  const buckets = useSelector((store) => store.bucket);

  return (
    <div className="bg-violet-600 rounded-3xl shadow-2xl max-w-[80%] pt-[20px] pb-[20px] ml-auto mr-auto mt-8 h-[330px] grid grid-cols-3   overflow-scroll no-scrollbar">
      {buckets.length === 0 ? (
        <EmptyBucketDisplay />
      ) : (
        buckets.map((bucket) => (
          <div
            key={bucket.id}
            onClick={() =>
              navigate("/all-tasks", { state: { bucketId: bucket.id } })
            }
            className="border-black-700 border-2 rounded-2xl w-[200px] h-[200px] mb-4 ml-auto mr-auto flex-col cursor-pointer transition-transform duration-300 hover:scale-110"
          >
            <div className="bg-black text-white font-bold flex justify-center rounded-t-[10px] flex-1">
              {bucket.title}
            </div>
            <div className="h-[150px] flex-col justify-items-center items-center flex-5 content-center">
              <p className="font-bold">Total tasks: {bucket.tasks.length}</p>
              <p className="font-bold">Completed: 0</p>
              <p className="font-bold">Pending: 0</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TasksBuckets;
