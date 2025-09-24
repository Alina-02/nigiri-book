"use client";

import { useRef } from "react";
import ReadFloatingMenu from "@/components/ReadFloatingMenu";
import { useMainStore } from "@/store/mainStore";
import React from "react";
import ReadMenu from "@/components/ReadMenu";
import { useEpubReader } from "@/hooks/useEpubReader";

const Read = () => {
  const { selectedBookDetails, setSelectedBookDetails } = useMainStore();
  const viewerRef = useRef<HTMLDivElement>(null);

  // Use the custom hook to manage the ePub logic
  useEpubReader(viewerRef, selectedBookDetails, setSelectedBookDetails);

  // Derive page and percentage from the store
  const page = selectedBookDetails?.progressPage || 0;
  const percentage = selectedBookDetails?.progressPercentage || 0;

  return (
    <>
      <ReadFloatingMenu />
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
        <ReadMenu />
      </div>
    </>
  );
};

export default Read;
