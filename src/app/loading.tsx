import React from "react";
import { Icons } from "@/components/Icons";

const MainLoading = () => {
  return (
    <div
      id="main-container"
      className="flex items-center justify-center min-h-screen p-8 pb-8 sm:p-20"
    >
      <div className="shadow-lg  rounded-full bg-primary w-[420px] h-[420px] flex items-center justify-center">
        <Icons.main />
      </div>
    </div>
  );
};

export default MainLoading;
