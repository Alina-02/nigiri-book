import React from "react";
import { Icons } from "./Icons";

const ReadFloatingMenu = () => {
  return (
    <div
      className="px-4 gap-7 items-center bg-primary rounded-xl flex flex-row p-2 justify-around"
      style={{
        width: "fit-content",
        position: "absolute",
        top: "90px",
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      <button className="cursor-pointer">
        <Icons.back />
      </button>
      <button className="cursor-pointer">
        <Icons.singlePage />
      </button>
      <button className="cursor-pointer">
        <Icons.settings />
      </button>
      <button className="cursor-pointer">
        <Icons.menu />
      </button>
    </div>
  );
};

export default ReadFloatingMenu;
