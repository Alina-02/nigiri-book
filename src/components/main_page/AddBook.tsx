"use client";

import { useMainStore } from "@/store/mainStore";
import React from "react";
import { Icons } from "../icons/Icons";
import { ShelfType } from "./MinimizeShelf";

interface Props {
  shelfType: ShelfType;
}

const BookCover = (props: Props) => {
  const { shelfType } = props;
  const { setBooks } = useMainStore();

  const addNewBook = () => {
    window.api.addNewBook(shelfType).then((newBooks) => {
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
