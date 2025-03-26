const EmptyBucketDisplay = () => {
  return (
    <div className="flex flex-col items-center justify-center m-auto w-full h-full space-y-4 text-white">
      <div className="text-3xl font-bold tracking-wide">No tasks yet</div>
      <div className="text-lg text-gray-200 hover:text-gray-100 transition-colors duration-300">
        Create a new bucket to start with
      </div>
    </div>
  );
};

export default EmptyBucketDisplay;
