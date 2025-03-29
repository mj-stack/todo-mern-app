import { ImCancelCircle } from "react-icons/im";

const Tasks = ({ displayTask, setDisplayTask }) => {
  const handleDisplayTaskRemoval = (taskToRemove) => {
    setDisplayTask(displayTask.filter((task) => task.id !== taskToRemove.id));
  };

  return (
    <section className="ml-auto mr-auto w-[60%] grid grid-cols-1 justify-center gap-3 max-h-50 overflow-scroll no-scrollbar">
      {displayTask.map((task, index) => (
        <div
          key={index}
          className="rounded-3xl w-[90%] ml-auto mr-auto flex items-center h-[40px] mt-2 relative pl-4 bg-purple-700"
        >
          <div className="text-[18px]">{task.task}</div>
          <div className="absolute right-[20px] cursor-pointer">
            <ImCancelCircle
              onClick={() => handleDisplayTaskRemoval(task)}
              className="text-white text-[18px] hover:text-gray-300"
            />
          </div>
        </div>
      ))}
    </section>
  );
};

export default Tasks;
