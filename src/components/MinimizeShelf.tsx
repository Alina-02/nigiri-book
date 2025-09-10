import React from "react";
import Book from "./Book";

interface Props {
  shelfTitle: string;
}

const MinimizeShelf = (props: Props) => {
  const { shelfTitle } = props;
  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-inter font-bold text-xl">{shelfTitle}</h3>
      <div className="flex flex-row gap-3">
        <Book />
        <Book />
        <Book />
        <Book />
      </div>
    </div>
  );
};

export default MinimizeShelf;
