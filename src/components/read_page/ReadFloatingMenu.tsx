import React from "react";
import Link from "next/link";
import { Icons } from "../icons/Icons";
import { Rendition } from "epubjs";
import { useMainStore } from "@/store/mainStore";

interface Props {
  showMenu: boolean;
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;

  rendition: Rendition | null;
}

const ReadFloatingMenu = (props: Props) => {
  const { showMenu, setShowMenu, rendition } = props;
  const { setSelectedBookDetails, selectedBookDetails } = useMainStore();

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
        onClick={() => {
          if (!rendition) return;
          rendition.on("relocated", (location: Location) => {
            if (!selectedBookDetails?.title) return;
            setSelectedBookDetails(
              {
                ...selectedBookDetails,
                progressCfi: location,
              },
              false
            );
          });
        }}
      >
        <Icons.back />
      </Link>
      {/*<button className="cursor-pointer">
        <Icons.singlePage />
      </button>*/}
      <button className="cursor-pointer">
        <Icons.settingsWhite />
      </button>
      <button
        className="cursor-pointer"
        onClick={() => {
          setShowMenu(!showMenu);
        }}
      >
        <Icons.menu />
      </button>
    </div>
  );
};

export default ReadFloatingMenu;
