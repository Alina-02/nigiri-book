import React, { useState } from "react";
import { useMainStore } from "@/store/mainStore";
import { Icons } from "../icons/Icons";

enum ReadMenuState {
  MENU = "Menu",
  DETAILS = "Details",
  QUOTES = "Quotes",
  COMMENTS = "Comments",
  SETTINGS = "Settings",
}

const ReadMenu = () => {
  const { selectedBookDetails } = useMainStore();

  const [state, setState] = useState<ReadMenuState>(ReadMenuState.MENU);

  return (
    <div className="rounded-2xl shadow-md w-[350px] min-w-[350px]">
      {state === ReadMenuState.MENU && (
        <>
          <div className="flex flex-row items-center justify-center pt-4">
            <div className="mr-2">
              <Icons.mainTopBar />
            </div>
            <p className="font-inter-bold font-bold text-2xl">Nigiri</p>
            <p className="font-inter-extralight  text-2xl">Book</p>
          </div>

          <div className="mt-6">
            <button
              className="w-full flex justify-center items-center py-3 cursor-pointer bg-gray-200 hover:bg-gray-300 transition-colors"
              onClick={() => {
                setState(ReadMenuState.DETAILS);
              }}
            >
              Details
            </button>
            <button
              className="w-full flex justify-center items-center py-3 cursor-pointer bg-gray-200 hover:bg-gray-300 transition-colors"
              onClick={() => {
                setState(ReadMenuState.QUOTES);
              }}
            >
              Quotes
            </button>
            <button
              className="w-full flex justify-center items-center py-3 cursor-pointer bg-gray-200 hover:bg-gray-300 transition-colors"
              onClick={() => {
                setState(ReadMenuState.COMMENTS);
              }}
            >
              Comments
            </button>
            <button
              className="w-full flex justify-center items-center py-3 cursor-pointer bg-gray-200 hover:bg-gray-300 transition-colors"
              onClick={() => {
                setState(ReadMenuState.SETTINGS);
              }}
            >
              Settings
            </button>
          </div>
        </>
      )}

      {state === ReadMenuState.DETAILS && (
        <>
          <div className="flex flex-row items-center justify-center pt-4">
            <p className="font-inter-extralight  text-2xl">Details</p>
          </div>

          <div className="mt-6 px-4">
            <h2>{selectedBookDetails?.title}</h2>
            <h2>{selectedBookDetails?.author}</h2>
            <h2>{selectedBookDetails?.description}</h2>
          </div>
        </>
      )}

      {state === ReadMenuState.QUOTES && (
        <>
          <div className="flex flex-row items-center justify-center pt-4">
            <p className="font-inter-extralight  text-2xl">Quotes</p>
          </div>

          <div className="mt-6 px-4">
            <ul>
              {selectedBookDetails?.quotes?.map((quote) => {
                <li key={quote}>{quote}</li>;
              })}
            </ul>
          </div>
        </>
      )}

      {state === ReadMenuState.COMMENTS && (
        <>
          <div className="flex flex-row items-center justify-center pt-4">
            <p className="font-inter-extralight  text-2xl">Comments</p>
          </div>

          <div className="mt-6 px-4">
            <ul>
              {selectedBookDetails?.comments?.map((comment) => {
                <li key={comment}>{comment.text}</li>;
              })}
            </ul>
          </div>
        </>
      )}

      {state === ReadMenuState.SETTINGS && (
        <>
          <div className="flex flex-row items-center justify-center pt-4">
            <p className="font-inter-extralight  text-2xl">Settings</p>
          </div>

          <div className="mt-6 px-4">
            <h2>{selectedBookDetails?.title}</h2>
            <h2>{selectedBookDetails?.author}</h2>
            <h2>{selectedBookDetails?.description}</h2>
          </div>
        </>
      )}
    </div>
  );
};

export default ReadMenu;
