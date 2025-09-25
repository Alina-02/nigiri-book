import React from "react";
import { Icons } from "../icons/Icons";

const TopBar = () => {
  return (
    <div className="w-full h-[68px] min-h-[68px] flex flex-row justify-between p-4 items-center shadow-md sticky">
      <button className="w-[36px] h-[36px] cursor-pointer">
        <Icons.stats />
      </button>
      <div className="flex flex-row items-center">
        <div className="mr-2">
          <Icons.mainTopBar />
        </div>
        <p className="font-inter-bold font-bold text-2xl">Nigiri</p>
        <p className="font-inter-extralight  text-2xl">Book</p>
      </div>
      <button className="w-[36px] h-[36px] cursor-pointer">
        <Icons.settingsBlack />
      </button>
    </div>
  );
};

export default TopBar;
