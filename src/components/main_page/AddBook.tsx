"use client";

import { useMainStore } from "@/store/mainStore";
import React from "react";
import { Icons } from "../icons/Icons";

const BookCover = () => {
  const { selectedBookDetails, setSelectedBookDetails } = useMainStore();

  const addNewBook = () => {
    window.api.showOpenBook();
  };

  return (
    <div
      className="flex h-[220px] w-[138px] min-w-[138px] border-2 bg-secondary rounded-2xl cursor-pointer justify-center items-center"
      onClick={addNewBook}
    >
      {<Icons.addBook />}
    </div>
  );
};

export default BookCover;
