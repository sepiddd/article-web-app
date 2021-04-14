import { Spin } from "antd";

const Loading = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
      <Spin />
    </div>
  );
};

export default Loading;
