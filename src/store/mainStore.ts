import { books } from "@/sampleData/sampleBooks";
import { Book } from "@/types/Book";
import { create } from "zustand";
interface MainStore {
  selectedBookDetails: Book | null;
  setSelectedBookDetails: (book: Book | null) => void;

  books: Book[];
  setBooks: (allBooks: Book[]) => void;
}

export const useMainStore = create<MainStore>()((set) => ({
  books: [],
  selectedBookDetails: null,
  setBooks: (allBooks: Book[]) => set((state) => ({ books: allBooks })),
  setSelectedBookDetails: (book: Book | null) =>
    set((state) => ({ selectedBookDetails: book })),
}));
