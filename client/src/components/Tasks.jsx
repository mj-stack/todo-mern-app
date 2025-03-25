import { ImCancelCircle } from "react-icons/im";

const Tasks = ({ displayTask }) => {
  return (
    <section className="ml-auto mr-auto w-[60%] grid grid-cols-1 h-[130px] overflow-scroll no-scrollbar">
      {displayTask.map((task, index) => (
        <div
          key={index}
          className="border-2 border-black rounded-3xl w-[90%] ml-auto mr-auto flex items-center h-[40px] mt-2 relative pl-4"
        >
          <div>{task}</div>
          <div className="absolute right-[20px] cursor-pointer">
            <ImCancelCircle className="text-red-900 text-2xl" />
          </div>
        </div>
      ))}
    </section>
  );
};

export default Tasks;
