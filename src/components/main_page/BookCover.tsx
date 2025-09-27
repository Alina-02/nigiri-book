"use client";

import { useMainStore } from "@/store/mainStore";
import React from "react";
import { BookData } from "@/types/Book";

interface Props {
  book: BookData;
}

const BookCover = (props: Props) => {
  const { book } = props;
  const { selectedBookDetails, setSelectedBookDetails } = useMainStore();

  return (
    <div
      className="h-[220px] w-[138px] min-w-[138px] border-2 bg-amber-300 rounded-2xl cursor-pointer flex justify-center items-center text-center"
      style={{ backgroundImage: `${book?.cover}` }}
      onClick={() => {
        if (!selectedBookDetails || selectedBookDetails.title !== book.title) {
          setSelectedBookDetails(book, false);
        } else {
          setSelectedBookDetails(null, false);
        }
      }}
    >
      {book.title}
    </div>
  );
};

export default BookCover;
