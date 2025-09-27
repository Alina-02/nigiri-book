"use client";

import BookDetailsCard from "@/components/main_page/BookDetailsCard";
import MinimizeShelf, { ShelfType } from "@/components/main_page/MinimizeShelf";
import { useMainStore } from "@/store/mainStore";
import { useEffect } from "react";

export default function Home() {
  const { selectedBookDetails, setBooks } = useMainStore();

  useEffect(() => {
    window.api.getBooksData().then((books) => {
      setBooks(books);
    });
  }, []);

  return (
    <div className="flex flex-row pl-16 mr-4 gap-4 my-4">
      <div
        className={`flex flex-col gap-8 overflow-y-auto h-[calc(100vh-98px)] max-[1139px]:w-0 ${
          selectedBookDetails ? "w-3/5" : "w-full"
        }`}
      >
        <div
          className={`flex justify-between gap-4 
                    ${selectedBookDetails ? "flex-col" : "flex-row"} 
                    max-[1063px]:flex-col`}
        >
          <MinimizeShelf
            shelfTitle="Reading"
            shelfType={ShelfType.Reading}
            first
          />
          <MinimizeShelf
            shelfTitle="Pending"
            shelfType={ShelfType.Pending}
            first
          />
        </div>
        <div
          className={`flex justify-between gap-4 
                     ${selectedBookDetails ? "flex-col" : "flex-row"} 
                     max-[1063px]:flex-col`}
        >
          <MinimizeShelf
            shelfTitle="Favourite"
            shelfType={ShelfType.Favourite}
          />
          <MinimizeShelf
            shelfTitle="Read"
            shelfType={ShelfType.Finished}
            last
          />
        </div>
      </div>
      <div className="h-[calc(100vh-68px)]">
        {selectedBookDetails && <BookDetailsCard />}
      </div>
    </div>
  );
}
