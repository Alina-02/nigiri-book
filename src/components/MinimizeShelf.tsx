import React from "react";
import { books } from "@/sampleData/sampleBooks";
import { BookState } from "@/types/Book";
import BookCover from "./BookCover";

interface Props {
  shelfTitle: string;
  shelfType: ShelfType;
}

export enum ShelfType {
  Reading = "READING",
  Pending = "PENDING",
  Favourite = "FAVOURITE",
  Finished = "FINISHED",
}

const MinimizeShelf = (props: Props) => {
  const { shelfTitle, shelfType } = props;
  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-inter font-bold text-xl">{shelfTitle}</h3>
      <div className="flex flex-row gap-3 overflow-hidden">
        {books
          .filter((book) => {
            if (shelfType === ShelfType.Reading) {
              return book.state === BookState.Reading;
            } else if (shelfType === ShelfType.Favourite) {
              return !book.favourite;
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
