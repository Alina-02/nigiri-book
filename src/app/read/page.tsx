"use client";

import { useEffect, useRef, useState } from "react";
import ePub, { Book, Rendition } from "epubjs";

import ReadFloatingMenu from "@/components/ReadFloatingMenu";
import { useMainStore } from "@/store/mainStore";
import React from "react";
import ReadMenu from "@/components/ReadMenu";
import { BookState } from "@/types/Book";

const Read = () => {
  const { selectedBookDetails, setSelectedBookDetails } = useMainStore();

  const viewerRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<Book | null>(null);
  const renditionRef = useRef<Rendition | null>(null);

  const [page, setPage] = useState(0);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    if (!viewerRef.current || !selectedBookDetails?.file) return;

    let cancelled = false;

    const loadBook = async () => {
      if (!selectedBookDetails.file) return;
      const bookBase64 = await window.api.getBookFile(selectedBookDetails.file);

      if (!bookBase64 || cancelled) return;

      const byteArray = Uint8Array.from(atob(bookBase64), (c) =>
        c.charCodeAt(0)
      );
      const blob = new Blob([byteArray], { type: "application/epub+zip" });
      const arrayBuffer = await blob.arrayBuffer();

      if (renditionRef.current) {
        renditionRef.current.destroy();
        renditionRef.current = null;
      }
      if (bookRef.current) {
        bookRef.current.destroy?.();
        bookRef.current = null;
      }
      if (viewerRef.current) viewerRef.current.innerHTML = "";

      const book = ePub(arrayBuffer);

      if (viewerRef.current) {
        const rendition = book.renderTo(viewerRef.current, {
          width: "100%",
          height: "100%",
        });

        bookRef.current = book;
        renditionRef.current = rendition;

        await book.ready;
        await book.locations.generate(1000);

        rendition.display(book.navigation?.toc?.[0]?.href || undefined);

        rendition.on("relocated", (location: any) => {
          if (!location?.start?.cfi) return;

          const currentPage = book.locations.locationFromCfi(
            location.start.cfi
          );
          const percentage = book.locations.percentageFromCfi(
            location.start.cfi
          );

          setPage(currentPage);
          setSelectedBookDetails({
            ...selectedBookDetails,
            progressPage: currentPage,
          });
          if (currentPage !== 0) {
            const newBookData = {
              ...selectedBookDetails,
              progressPage: currentPage as number,
              state: BookState.Reading,
            };
            setSelectedBookDetails(newBookData);
            if (!selectedBookDetails.file) return;
            window.api.updateBookData(selectedBookDetails.file, newBookData);
          }
          setPercentage(Math.round(percentage * 100));
        });
      }
    };

    loadBook();

    return () => {
      cancelled = true;
      if (renditionRef.current) {
        renditionRef.current.destroy();
        renditionRef.current = null;
      }
      if (bookRef.current) {
        bookRef.current.destroy?.();
        bookRef.current = null;
      }
      if (viewerRef.current) viewerRef.current.innerHTML = "";
    };
  }, [selectedBookDetails?.file]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!renditionRef.current) return;

      if (e.key === "ArrowRight") renditionRef.current.next();
      if (e.key === "ArrowLeft") renditionRef.current.prev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <ReadFloatingMenu />
      <div className="flex flex-row ml-10 mr-8 my-16 gap-8 h-full overflow-hidden">
        <div className="h-full w-full flex flex-col gap-2">
          <div className="flex flex-row justify-between px-4 font-bold">
            <p>Page {page}</p>
            <p>{percentage}%</p>
          </div>
          <div
            ref={viewerRef}
            className="shadow-md p-4 bg-amber-100 max-h-[1384px] min-h-5/6 rounded-2xl font-inria-sherif"
          />
        </div>
        <ReadMenu />
      </div>
    </>
  );
};

export default Read;
