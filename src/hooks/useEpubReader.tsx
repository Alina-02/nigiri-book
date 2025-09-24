// hooks/useEpubReader.ts
import { useEffect, useRef } from "react";
import ePub, { Book, Rendition } from "epubjs";
import { useMainStore } from "@/store/mainStore";
import { Book as BookType, BookState } from "@/types/Book";

export const useEpubReader = (
  viewerRef: React.RefObject<HTMLDivElement> | null,
  selectedBookDetails: BookType | null,
  setSelectedBookDetails: (book: BookType | null) => void
) => {
  const bookRef = useRef<Book | null>(null);
  const renditionRef = useRef<Rendition | null>(null);
  const bookLoadedRef = useRef(false);

  useEffect(() => {
    if (
      !viewerRef ||
      !viewerRef.current ||
      !selectedBookDetails?.file ||
      bookLoadedRef.current
    )
      return;

    const loadBook = async () => {
      try {
        if (!selectedBookDetails.file) return;

        // Clean up any existing book/rendition
        if (renditionRef.current) {
          renditionRef.current.destroy();
          renditionRef.current = null;
        }
        if (bookRef.current) {
          bookRef.current.destroy?.();
          bookRef.current = null;
        }
        if (viewerRef.current) viewerRef.current.innerHTML = "";

        const bookBase64 = await window.api.getBookFile(
          selectedBookDetails.file
        );
        if (!bookBase64) {
          throw new Error("Could not load book file.");
        }

        const byteArray = Uint8Array.from(atob(bookBase64), (c) =>
          c.charCodeAt(0)
        );
        const blob = new Blob([byteArray], { type: "application/epub+zip" });
        const arrayBuffer = await blob.arrayBuffer();

        const book = ePub(arrayBuffer);
        const rendition = book.renderTo(viewerRef.current, {
          width: "100%",
          height: "100%",
        });

        bookRef.current = book;
        renditionRef.current = rendition;
        bookLoadedRef.current = true;

        await book.ready;
        await book.locations.generate(1000);

        const startCfi = book.navigation?.toc?.[0]?.href;
        if (startCfi) {
          rendition.display(startCfi);
        }

        rendition.on("relocated", (location: any) => {
          if (!location?.start?.cfi) return;

          const currentPage = book.locations.locationFromCfi(
            location.start.cfi
          );
          const percentage = book.locations.percentageFromCfi(
            location.start.cfi
          );

          const newBookData = {
            ...selectedBookDetails,
            progressPage: currentPage as number,
            progressPercentage: Math.round(percentage * 100),
            progressCfi: location.start.cfi,
            state: BookState.Reading,
          };
          setSelectedBookDetails(newBookData);

          if (!selectedBookDetails.file) return;
          window.api.updateBookData(selectedBookDetails.file, newBookData);
        });
      } catch (error) {
        console.error("Failed to load ePub book:", error);
      }
    };

    loadBook();
  }, [viewerRef, selectedBookDetails, setSelectedBookDetails]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!renditionRef.current) return;
      if (e.key === "ArrowRight") renditionRef.current.next();
      if (e.key === "ArrowLeft") renditionRef.current.prev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return { rendition: renditionRef.current };
};
