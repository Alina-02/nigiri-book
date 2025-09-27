import React, { useEffect, useState } from "react";
import { BookState } from "@/types/Book";
import BookCover from "./BookCover";
import AddBook from "./AddBook";
import { useMainStore } from "@/store/mainStore";
import Link from "next/link";

import "../../styles/underlineButtonAnimation.css";

interface Props {
  shelfTitle: string;
  shelfType: ShelfType;
  last?: boolean;
  first?: boolean;
}

export enum ShelfType {
  Reading = "READING",
  Pending = "PENDING",
  Favourite = "FAVOURITE",
  Finished = "FINISHED",
}

const getBookType = (shelfType: string) => {
  if (shelfType === ShelfType.Reading) {
    return BookState.Reading;
  } else if (shelfType === ShelfType.Finished) {
    return BookState.Read;
  } else {
    return BookState.Pendant;
  }
};

const MinimizeShelf = (props: Props) => {
  const { shelfTitle, shelfType, first, last } = props;
  const { getBooksByState, getFavoriteBooks, selectedBookDetails } =
    useMainStore();
  const books =
    shelfType === ShelfType.Favourite
      ? getFavoriteBooks()
      : getBooksByState(getBookType(shelfType));

  const [visible, setVisible] = useState(4);

  useEffect(() => {
    const updateVisible = () => {
      if (selectedBookDetails) {
        if (window.innerWidth >= 1478 && window.innerWidth < 1673) {
          setVisible(2);
        } else if (window.innerWidth >= 1673 && window.innerWidth < 1638) {
          setVisible(3);
        } else if (window.innerWidth >= 1638) {
          setVisible(4);
        }
      } else {
        if (window.innerWidth >= 583 && window.innerWidth < 733) {
          setVisible(2);
        } else if (window.innerWidth >= 733 && window.innerWidth < 885) {
          setVisible(3);
        } else if (window.innerWidth >= 885 && window.innerWidth < 1063) {
          setVisible(4);
        } else if (window.innerWidth >= 1063 && window.innerWidth < 1360) {
          setVisible(2);
        } else if (window.innerWidth >= 1360 && window.innerWidth < 1661) {
          setVisible(3);
        } else if (window.innerWidth >= 1661) {
          setVisible(4);
        }
      }
    };

    updateVisible();
    window.addEventListener("resize", updateVisible);

    return () => window.removeEventListener("resize", updateVisible);
  }, [books.length]);

  return (
    <div
      className={`flex flex-col gap-3
        ${selectedBookDetails ? "w-full" : "w-1/2"}  
         max-[1063px]:w-full
        ${last ? "mb-6" : "mb-0"} 
        ${first ? "mt-6" : "mt-0"}`}
    >
      <Link href={`/${shelfTitle.toLowerCase()}`} className="w-fit">
        <h3 className="font-inter font-bold text-xl btn-underline">
          {shelfTitle}
        </h3>
      </Link>
      <div className="flex flex-row gap-3 overflow-hidden">
        <AddBook />
        {books?.slice(0, visible).map((book, index) => (
          <BookCover
            key={book.title.trim().toLowerCase() + index}
            book={book}
          />
        ))}
        {books.length > 4 && (
          <Link
            href={`/${shelfTitle.toLowerCase()}`}
            className="mt-3 font-inter h-fit flex row gap-2 justify-center  group"
            style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
          >
            <span className="writing-vertical">See all</span>
            <span className="mt-1 transform opacity-0 translate-y-[-5px] transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
              →
            </span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default MinimizeShelf;
