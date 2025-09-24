"use client";

import { useMainStore } from "@/store/mainStore";
import { Book, BookState } from "@/types/Book";
import React, { useEffect, useState } from "react";
import { Icons } from "./Icons";
import Link from "next/link";

const BookDetailsCard = () => {
  const { selectedBookDetails, setSelectedBookDetails } = useMainStore();
  const [isEditingReview, setIsEditingReview] = useState(false);
  const [reviewText, setReviewText] = useState("");

  useEffect(() => {
    if (selectedBookDetails) {
      setReviewText(selectedBookDetails.review || "");
    }
  }, [selectedBookDetails]);

  const handleEditReviewClick = () => {
    setIsEditingReview(!isEditingReview);
  };

  const updateBookHearts = (score: number) => {
    if (!selectedBookDetails || !selectedBookDetails?.file) return;

    const newBookData: Book = {
      ...selectedBookDetails,
      valoration: score,
    };

    setSelectedBookDetails(newBookData);
    window.api.updateBookData(selectedBookDetails?.file, newBookData);
  };

  const updateBookReview = () => {
    if (!selectedBookDetails || !selectedBookDetails?.file) return;

    const newBookData: Book = {
      ...selectedBookDetails,
      review: reviewText,
    };

    setSelectedBookDetails(newBookData);
    window.api.updateBookData(selectedBookDetails?.file, newBookData);
  };

  const updateBookStatus = (newState: BookState) => {
    if (!selectedBookDetails || !selectedBookDetails?.file) return;

    const newBookData: Book = {
      ...selectedBookDetails,
      state: newState,
    };

    setSelectedBookDetails(newBookData);
    window.api.updateBookData(selectedBookDetails?.file, newBookData);
  };

  return (
    <div
      id="book-details-card"
      className="my-12 py-8 flex flex-col pl-8 pb-4 pr-4 gap-6 rounded-lg shadow-md w-[735px] h-[calc(100vh-148px)] overflow-auto"
    >
      <div className="flex flex-row gap-6">
        <div id="cover-and-hearts" className="flex flex-col gap-4">
          <div
            id="cover"
            className="w-[269px] h-[429px] bg-emerald-500 rounded-xl"
          ></div>
          <div id="hearts" className="flex flex-row gap-1 justify-between px-8">
            {selectedBookDetails?.valoration &&
            selectedBookDetails?.valoration >= 1 ? (
              <Icons.filledHeart
                onClick={() => {
                  updateBookHearts(1);
                }}
                className="cursor-pointer"
              />
            ) : (
              <Icons.heart
                onClick={() => {
                  updateBookHearts(1);
                }}
                className="cursor-pointer"
              />
            )}
            {selectedBookDetails?.valoration &&
            selectedBookDetails?.valoration >= 2 ? (
              <Icons.filledHeart
                onClick={() => {
                  updateBookHearts(2);
                }}
                className="cursor-pointer"
              />
            ) : (
              <Icons.heart
                onClick={() => {
                  updateBookHearts(2);
                }}
                className="cursor-pointer"
              />
            )}
            {selectedBookDetails?.valoration &&
            selectedBookDetails?.valoration >= 3 ? (
              <Icons.filledHeart
                onClick={() => {
                  updateBookHearts(3);
                }}
                className="cursor-pointer"
              />
            ) : (
              <Icons.heart
                onClick={() => {
                  updateBookHearts(3);
                }}
                className="cursor-pointer"
              />
            )}
            {selectedBookDetails?.valoration &&
            selectedBookDetails?.valoration >= 4 ? (
              <Icons.filledHeart
                onClick={() => {
                  updateBookHearts(4);
                }}
                className="cursor-pointer"
              />
            ) : (
              <Icons.heart
                onClick={() => {
                  updateBookHearts(4);
                }}
                className="cursor-pointer"
              />
            )}
            {selectedBookDetails?.valoration === 5 ? (
              <Icons.filledHeart
                onClick={() => {
                  updateBookHearts(5);
                }}
                className="cursor-pointer"
              />
            ) : (
              <Icons.heart
                onClick={() => {
                  updateBookHearts(5);
                }}
                className="cursor-pointer"
              />
            )}
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
                className="rounded-full bg-pending max-w-max px-4 cursor-pointer"
                onClick={() => {
                  updateBookStatus(BookState.Reading);
                }}
              >
                Pendant
              </div>
            ) : selectedBookDetails?.state === BookState.Read ? (
              <div
                id="state"
                className="rounded-full bg-read max-w-max px-4 cursor-pointer"
                onClick={() => {
                  updateBookStatus(BookState.Pendant);
                }}
              >
                Read
              </div>
            ) : (
              <div
                id="state"
                className="rounded-full bg-progress max-w-max px-4 cursor-pointer"
                onClick={() => {
                  updateBookStatus(BookState.Read);
                }}
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
          <Link
            href="/read"
            className="p-2 rounded-lg w-full bg-primary flex justify-center items-center text-white"
          >
            Read
          </Link>
        </div>
      </div>

      <div id="reviews">
        <h3 className="font-inter-bold text-lg">Review</h3>
        {isEditingReview ? (
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            onBlur={() => {
              updateBookReview();
              handleEditReviewClick();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                updateBookReview();
                handleEditReviewClick();
              }
            }}
            className="w-full h-44 p-2 rounded-xl border-primary mt-4"
            autoFocus
          />
        ) : (
          <p
            onClick={handleEditReviewClick}
            className="cursor-pointer"
            style={{ overflowWrap: "break-word" }}
          >
            {selectedBookDetails?.review
              ? selectedBookDetails.review
              : "What do you think about this book?"}
          </p>
        )}
      </div>

      <div id="quotes">
        <h3 className="font-inter-bold text-lg">Quotes</h3>
        <ul>
          {selectedBookDetails?.quotes.length
            ? selectedBookDetails?.quotes.map((quote, index) => (
                <ol key={index}>{quote}</ol>
              ))
            : "No quotes already :P"}
        </ul>
      </div>
      <div id="comments">
        <h3 className="font-inter-bold text-lg">Comments</h3>
        <ul>
          {selectedBookDetails?.comments.length
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
