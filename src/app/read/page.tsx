"use client";

import { useEffect, useRef } from "react";
import ePub, { Book, Rendition } from "epubjs";

import ReadFloatingMenu from "@/components/ReadFloatingMenu";
import { useMainStore } from "@/store/mainStore";
import React from "react";

const Read = () => {
  const { selectedBookDetails } = useMainStore();

  const viewerRef = useRef<HTMLDivElement>(null);
  const renditionRef = useRef<Rendition | null>(null);
  const bookRef = useRef<Book | null>(null);

  useEffect(() => {
    if (!viewerRef.current || !selectedBookDetails?.file) return;

    let cancelled = false;

    const loadBook = async () => {
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
      const rendition = book.renderTo(viewerRef.current, {
        width: "100%",
        height: "100%",
      });

      bookRef.current = book;
      renditionRef.current = rendition;

      rendition.display(book.navigation?.toc?.[0]?.href || undefined);
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

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <ReadFloatingMenu />
      <div className="flex flex-row mx-16 my-16 gap-4 h-full">
        <div className="w-full h-full flex flex-col gap-2">
          <div className="flex flex-row justify-between px-4">
            <p>Page 145</p>
            <p>...</p>
          </div>
          <div
            ref={viewerRef}
            className="p-8 bg-amber-100 max-h-[1384px] min-h-5/6 rounded-2xl font-inria-sherif"
          />
        </div>
      </div>
    </>
  );
};

export default Read;
