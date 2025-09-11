"use client";

import BookDetailsCard from "@/components/BookDetailsCard";
import MinimizeShelf, { ShelfType } from "@/components/MinimizeShelf";
import { useMainStore } from "@/store/mainStore";

export default function Home() {
  const { selectedBookDetails } = useMainStore();

  return (
    <div className="flex flex-row mx-16 my-12 gap-4">
      <div
        className="flex flex-col gap-8 overflow-y-scroll"
        style={{ width: selectedBookDetails ? "60%" : "100%" }}
      >
        <MinimizeShelf shelfTitle="Reading" shelfType={ShelfType.Reading} />
        <MinimizeShelf shelfTitle="Pending" shelfType={ShelfType.Pending} />
        <MinimizeShelf shelfTitle="Favourite" shelfType={ShelfType.Favourite} />
        <MinimizeShelf shelfTitle="Read" shelfType={ShelfType.Finished} />
      </div>
      <BookDetailsCard />
    </div>
  );
}
