"use client";

import { useMainStore } from "@/store/mainStore";
import { Book, BookState } from "@/types/Book";
import React from "react";
import Button, { ButtonType } from "./basic/Button";
import { Icons } from "./Icons";

const BookDetailsCard = () => {
  const { selectedBookDetails } = useMainStore();

  return (
    <div
      id="book-details-card"
      className="flex flex-col pt-4 pl-8 pb-4 pr-4 gap-6 rounded-lg shadow-md w-[735px] overflow-auto"
    >
      <div className="flex flex-row gap-6">
        <div id="cover-and-hearts" className="flex flex-col gap-4">
          <div
            id="cover"
            className="w-[269px] h-[429px] bg-emerald-500 rounded-xl"
          ></div>
          <div id="hearts" className="flex flex-row gap-1 justify-between px-8">
            <Icons.heart />
            <Icons.heart />
            <Icons.heart />
            <Icons.heart />
            <Icons.heart />
          </div>
        </div>
        <div id="basic-info" className="flex flex-col justify-between w-full ">
          <div className="flex flex-col gap-1 overflow-auto">
            <h2 id="title" className="text-3xl font-inter">
              {selectedBookDetails?.saga
                ? selectedBookDetails?.saga + " - " + selectedBookDetails?.title
                : selectedBookDetails?.title}
            </h2>
            <p id="author" className="text-xl font-inter-extralight">
              {selectedBookDetails?.author}
            </p>
            {selectedBookDetails?.state === BookState.Pendant ? (
              <div
                id="state"
                className="rounded-full bg-pending max-w-max px-4"
              >
                Pendant
              </div>
            ) : selectedBookDetails?.state === BookState.Read ? (
              <div id="state" className="rounded-full bg-read max-w-max px-4">
                Read
              </div>
            ) : (
              <div
                id="state"
                className="rounded-full bg-progress max-w-max px-4"
              >
                In progress
              </div>
            )}

            <p id="dates">
              {selectedBookDetails?.initDate[
                selectedBookDetails?.initDate.length - 1
              ]?.toDateString() +
                " - " +
                selectedBookDetails?.endDate[
                  selectedBookDetails?.endDate.length - 1
                ]?.toDateString()}
            </p>
            <p id="summary">{selectedBookDetails?.description}</p>
          </div>
          <Button text="Read" type={ButtonType.primary} />
        </div>
      </div>
      <div id="reviews">
        <h3 className="font-inter-bold text-lg">Review</h3>
        {selectedBookDetails?.review
          ? selectedBookDetails?.review
          : "What do you think about this book?"}
      </div>
      <div id="quotes">
        <h3 className="font-inter-bold text-lg">Quotes</h3>
        <ul>
          {selectedBookDetails?.quotes
            ? selectedBookDetails?.quotes.map((quote, index) => (
                <ol key={index}>{quote}</ol>
              ))
            : "No quotes already :P"}
        </ul>
      </div>
      <div id="comments">
        <h3 className="font-inter-bold text-lg">Comments</h3>
        <ul>
          {selectedBookDetails?.comments
            ? selectedBookDetails?.comments.map((comment, index) => (
                <ol key={index}>
                  Page {comment.page} - {comment.text}
                </ol>
              ))
            : "No comments already :P"}
        </ul>
      </div>
    </div>
  );
};

export default BookDetailsCard;
