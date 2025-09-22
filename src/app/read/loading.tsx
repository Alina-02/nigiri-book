import React from "react";

const loading = () => {
  return (
    <>
      <div className="flex flex-row mx-16 my-16 gap-4 h-full">
        <div className="w-full h-full flex flex-col gap-2">
          <div className="flex flex-row justify-between px-4">
            <p className="text-gray-300">Page ...</p>
            <p className="text-gray-300">...%</p>
          </div>
          <div className="p-8 bg-gray-100 max-h-[1384px] min-h-5/6 rounded-2xl font-inria-sherif"></div>
        </div>
      </div>
    </>
  );
};

export default loading;
