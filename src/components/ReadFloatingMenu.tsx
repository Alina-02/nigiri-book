import React from "react";
import { Icons } from "./Icons";
import Link from "next/link";

const ReadFloatingMenu = () => {
  return (
    <div
      className="px-4 gap-7 items-center bg-primary rounded-xl flex flex-row p-2 justify-around shadow-md"
      style={{
        width: "fit-content",
        position: "absolute",
        top: "90px",
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      <Link
        href="/"
        className="rounded-lg w-full bg-primary flex justify-center items-center text-white"
      >
        <Icons.back />
      </Link>
      {/*<button className="cursor-pointer">
        <Icons.singlePage />
      </button>*/}
      <button className="cursor-pointer">
        <Icons.settingsWhite />
      </button>
      <button className="cursor-pointer">
        <Icons.menu />
      </button>
    </div>
  );
};

export default ReadFloatingMenu;
