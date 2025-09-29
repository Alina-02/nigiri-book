"use client";

import { useMainStore } from "@/store/mainStore";
import React from "react";
import { Icons } from "../icons/Icons";

const BookCover = () => {
  const { setBooks } = useMainStore();

  const addNewBook = () => {
    window.api.addNewBook().then((newBooks) => {
      console.log(newBooks);

      if (!newBooks) return;
      setBooks(newBooks);
    });
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
