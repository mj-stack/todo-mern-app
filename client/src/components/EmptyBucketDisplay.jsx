import { useSelector } from "react-redux";

const EmptyBucketDisplay = () => {
  const buckets = useSelector((state) => state.bucket);

  return <div>Create a new bucket to start with</div>;
};

export default EmptyBucketDisplay;
