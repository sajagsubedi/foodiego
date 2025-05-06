import React from "react";

const LoadingPage = () => {
  return (
    <div className="absolute w-screen h-screen top-0 left-0 z-[9999] flex justify-center items-center">
      <div className="w-8 h-8 animate-spin relative">
        <span className="w-3 h-3 bg-rose-500 rounded-full top-0 left-0 absolute"></span>
        <span className="w-3 h-3 bg-rose-500 rounded-full top-0 right-0 absolute"></span>
        <span className="w-3 h-3 bg-rose-500 rounded-full bottom-0 left-0 absolute"></span>
        <span className="w-3 h-3 bg-rose-500 rounded-full bottom-0 right-0 absolute"></span>
      </div>
    </div>
  );
};

export default LoadingPage;
