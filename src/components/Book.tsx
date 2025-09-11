import React from "react";

interface Props {
  cover: string | undefined;
}

const Book = (props: Props) => {
  const { cover } = props;

  return (
    <div
      className="h-[220px] w-[138px] min-w-[138px] border-2 bg-amber-300 rounded-2xl"
      style={{ backgroundImage: `${cover}` }}
    ></div>
  );
};

export default Book;
