import { BookData } from "@/types/Book";
import ePub, { Book } from "epubjs";

export const getEpubFromBookData = async (bookDetails: BookData) => {
  if (!bookDetails.file) return;
  const bookBase64 = await window.api.getBookFile(bookDetails.file);

  if (!bookBase64) {
    throw new Error("Could not load book file.");
  }
  const byteArray = Uint8Array.from(atob(bookBase64), (c) => c.charCodeAt(0));
  const blob = new Blob([byteArray], { type: "application/epub+zip" });
  const arrayBuffer = await blob.arrayBuffer();

  const book = ePub(arrayBuffer);
  return book;
};

export const getBookCoverUrl = async (book: Book) => {
  await book.ready;

  const coverUrl = await book.coverUrl();

  return coverUrl;
};
