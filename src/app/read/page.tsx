"use client";

import { useRef, useState } from "react";
import { useMainStore } from "@/store/mainStore";
import React from "react";
import { useEpubReader } from "@/hooks/useEpubReader";
import ReadFloatingMenu from "@/components/read_page/ReadFloatingMenu";
import ReadMenu from "@/components/read_page/ReadMenu";

const Read = () => {
  const { selectedBookDetails, setSelectedBookDetails } = useMainStore();
  const viewerRef = useRef<HTMLDivElement>(null);

  const [showMenu, setShowMenu] = useState<boolean>(false);

  const rendition = useEpubReader(
    viewerRef,
    selectedBookDetails,
    setSelectedBookDetails
  );

  const page = selectedBookDetails?.progressPage || 0;
  const percentage = selectedBookDetails?.progressPercentage || 0;
  console.log(viewerRef);
  return (
    <>
      <ReadFloatingMenu
        setShowMenu={setShowMenu}
        showMenu={showMenu}
        rendition={rendition}
      />
      <div className="flex flex-row ml-10 mr-8 my-16 gap-8 h-full overflow-hidden">
        <div className="h-full w-full flex flex-col gap-2">
          <div className="flex flex-row justify-between px-4 font-bold">
            <p>Page {page}</p>
            <p>{percentage}%</p>
          </div>
          <div
            ref={viewerRef}
            className="shadow-md p-4 bg-amber-100 max-h-[1384px] min-h-5/6 rounded-2xl font-inria-sherif"
          />
        </div>
        {showMenu && <ReadMenu />}
      </div>
    </>
  );
};

export default Read;
