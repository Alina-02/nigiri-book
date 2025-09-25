"use client";

import { Icons } from "@/components/icons/Icons";
import AddBook from "@/components/main_page/AddBook";
import BookCover from "@/components/main_page/BookCover";
import ShortSelect, { sortOptions } from "@/components/shelfs_page/ShortSelect";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

const ReadingBookShelf = () => {
  const [selected, setSelected] = useState(sortOptions[1]);

  return (
    <div className="flex flex-col h-screen p-4 bg-gray-50">
      <header className="flex justify-between items-center py-6 px-10 mb-6">
        <Link href="/" className="text-2xl text-gray-700 cursor-pointer">
          <Icons.backBlack />
        </Link>
        <div className="flex items-centerspace-x-4">
          <h1 className="text-2xl font-inter-bold font-bold text-gray-800">
            Reading {`(${89})`}
          </h1>
        </div>

        <ShortSelect selected={selected} setSelected={setSelected} />
      </header>

      <div className="flex-1 overflow-y-auto px-10">
        <div className="grid grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-4">
          <AddBook />

          {[].map((book, index) => (
            <BookCover key={index} book={book} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReadingBookShelf;
