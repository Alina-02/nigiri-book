import React from "react";
import { BookState } from "@/types/Book";
import BookCover from "./BookCover";
import AddBook from "./AddBook";
import { useMainStore } from "@/store/mainStore";
import Link from "next/link";

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

const MinimizeShelf = (props: Props) => {
  const { shelfTitle, shelfType, first, last } = props;
  const { books } = useMainStore();

  return (
    <div
      className={`flex flex-col gap-3  ${last ? "mb-12" : "mb-0"} ${
        first ? "mt-12" : "mt-0"
      }`}
    >
      <Link href={`/${shelfTitle.toLowerCase()}`}>
        <h3 className="font-inter font-bold text-xl hover:underline">
          {shelfTitle}
        </h3>
      </Link>
      <div className="flex flex-row gap-3 overflow-hidden">
        <AddBook />
        {books
          ?.filter((book) => {
            if (shelfType === ShelfType.Reading) {
              return book.state === BookState.Reading;
            } else if (shelfType === ShelfType.Favourite) {
              return book.favourite;
            } else if (shelfType === ShelfType.Finished) {
              return book.state === BookState.Read;
            } else if (shelfType === ShelfType.Pending) {
              return book.state === BookState.Pendant;
            }
          })
          .map((book, index) => (
            <BookCover
              key={book.title.trim().toLowerCase() + index}
              book={book}
            />
          ))}
      </div>
    </div>
  );
};

export default MinimizeShelf;
