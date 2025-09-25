import { BookData, BookState } from "@/types/Book";
import {
  clearSelectedBookDetails,
  updateBookOnOpen,
} from "@/utils/reorderBooksByLastAccess";
import { create } from "zustand";
export interface MainStore {
  selectedBookDetails: BookData | null;
  setSelectedBookDetails: (book: BookData | null) => void;

  books: BookData[];
  setBooks: (allBooks: BookData[]) => void;

  getBooksByState: (targetState: BookState) => BookData[];
  getFavoriteBooks: () => BookData[];
}

export const useMainStore = create<MainStore>()((set, get) => ({
  books: [],
  selectedBookDetails: null,
  setBooks: (allBooks: BookData[]) => set((state) => ({ books: allBooks })),
  setSelectedBookDetails: (book: BookData | null) => {
    set((state) => {
      if (!book) {
        return clearSelectedBookDetails();
      }
      return updateBookOnOpen(state, book);
    });
  },
  getBooksByState: (targetState: BookState): BookData[] => {
    const allBooks = get().books;
    return allBooks.filter((book: BookData) => book.state === targetState);
  },
  getFavoriteBooks: (): BookData[] => {
    const allBooks = get().books;
    return allBooks.filter((book) => book.favourite === true);
  },
}));
