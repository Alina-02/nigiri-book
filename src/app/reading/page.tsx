"use client";

import { Icons } from "@/components/icons/Icons";
import AddBook from "@/components/main_page/AddBook";
import BookCover from "@/components/main_page/BookCover";
import BookDetailsCard from "@/components/main_page/BookDetailsCard";
import ShortSelect, { sortOptions } from "@/components/shelfs_page/ShortSelect";
import { useMainStore } from "@/store/mainStore";
import { BookState } from "@/types/Book";
import Link from "next/link";
import React, { useState } from "react";

const ReadingBookShelf = () => {
  const [selected, setSelected] = useState(sortOptions[1]);

  const { getBooksByState, selectedBookDetails } = useMainStore();
  const shelfBooks = getBooksByState(BookState.Reading);

  console.log(shelfBooks);
  return (
    <div className="flex flex-row">
      <div className="flex flex-col h-screen p-4 bg-gray-50 w-full">
        <header className="flex justify-between items-center py-6 px-10 mb-6">
          <Link href="/" className="text-2xl text-gray-700 cursor-pointer">
            <Icons.backBlack />
          </Link>
          <div className="flex items-centerspace-x-4">
            <h1 className="text-2xl font-inter-bold font-bold text-gray-800">
              Reading {`(${shelfBooks?.length})`}
            </h1>
          </div>

          <ShortSelect selected={selected} setSelected={setSelected} />
        </header>
        <div className="overflow-y-auto px-10">
          <div
            style={{
              display: "grid",
              gap: "1rem",
              gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
            }}
          >
            <AddBook />

            {shelfBooks?.map((book, index) => (
              <BookCover key={index} book={book} />
            ))}
          </div>
        </div>
      </div>
      <div
        className={`h-[calc(100vh-68px)] ${
          selectedBookDetails ? "mt-4" : "mt-0"
        } ${selectedBookDetails ? "mr-4" : "mr-0"}`}
      >
        {selectedBookDetails && <BookDetailsCard />}
      </div>
    </div>
  );
};

export default ReadingBookShelf;
