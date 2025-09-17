"use client";

import BookDetailsCard from "@/components/BookDetailsCard";
import MinimizeShelf, { ShelfType } from "@/components/MinimizeShelf";
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
    <div className="flex flex-row mx-16 gap-4">
      <div
        className="flex flex-col gap-8 overflow-y-auto h-[calc(100vh-68px)]"
        style={{ width: selectedBookDetails ? "60%" : "100%" }}
      >
        <MinimizeShelf
          shelfTitle="Reading"
          shelfType={ShelfType.Reading}
          first
        />
        <MinimizeShelf shelfTitle="Pending" shelfType={ShelfType.Pending} />
        <MinimizeShelf shelfTitle="Favourite" shelfType={ShelfType.Favourite} />
        <MinimizeShelf shelfTitle="Read" shelfType={ShelfType.Finished} last />
      </div>
      <div className="my-12">{selectedBookDetails && <BookDetailsCard />}</div>
    </div>
  );
}
