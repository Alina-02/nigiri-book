import { useEffect, useRef, useState } from "react";
import ePub, { Book, Rendition } from "epubjs";

export function useEpubReader(file?: string) {
  const viewerRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<Book | null>(null);
  const renditionRef = useRef<Rendition | null>(null);

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    if (!file || !viewerRef.current) return;

    let cancelled = false;

    const loadBook = async () => {
      const bookBase64 = await window.api.getBookFile(file);
      if (!bookBase64 || cancelled) return;

      const byteArray = Uint8Array.from(atob(bookBase64), (c) =>
        c.charCodeAt(0)
      );
      const blob = new Blob([byteArray], { type: "application/epub+zip" });
      const arrayBuffer = await blob.arrayBuffer();

      // limpiar instancias previas
      renditionRef.current?.destroy();
      bookRef.current?.destroy?.();
      viewerRef.current!.innerHTML = "";

      const book = ePub(arrayBuffer);
      const rendition = book.renderTo(viewerRef.current!, {
        width: "100%",
        height: "100%",
      });

      bookRef.current = book;
      renditionRef.current = rendition;

      await book.ready;
      await book.locations.generate(1000);

      setTotalPages(book.locations.length);

      rendition.display();

      rendition.on("relocated", (location: any) => {
        if (!location?.start?.cfi) return;

        const currentPage = book.locations.locationFromCfi(
          location.spine.first()
        );
        const percent = book.locations.percentageFromCfi(location.start.cfi);

        setPage(currentPage);
        setPercentage(percent * 100);
      });
    };

    loadBook();

    return () => {
      cancelled = true;
      renditionRef.current?.destroy();
      bookRef.current?.destroy?.();
      if (viewerRef.current) viewerRef.current.innerHTML = "";
    };
  }, [file]);

  const nextPage = () => renditionRef.current?.next();
  const prevPage = () => renditionRef.current?.prev();

  return {
    viewerRef,
    page,
    totalPages,
    percentage,
    nextPage,
    prevPage,
  };
}
