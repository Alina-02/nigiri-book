"use client";

import { useMainStore } from "@/store/mainStore";
import React from "react";
import { Book } from "@/types/Book";

interface Props {
  book: Book;
}

const BookCover = (props: Props) => {
  const { book } = props;
  const { selectedBookDetails, setSelectedBookDetails } = useMainStore();

  return (
    <div
      className="h-[220px] w-[138px] min-w-[138px] border-2 bg-amber-300 rounded-2xl cursor-pointer"
      style={{ backgroundImage: `${book?.cover}` }}
      onClick={() => {
        if (!selectedBookDetails || selectedBookDetails.title !== book.title) {
          setSelectedBookDetails(book);
        } else {
          setSelectedBookDetails(null);
        }
      }}
    ></div>
  );
};

export default BookCover;
