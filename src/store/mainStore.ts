import { books } from "@/sampleData/sampleBooks";
import { Book } from "@/types/Book";
import { create } from "zustand";
interface MainStore {
  selectedBookDetails: Book | null;
  setSelectedBookDetails: (book: Book | null) => void;
}

export const useMainStore = create<MainStore>()((set) => ({
  selectedBookDetails: books[11],
  setSelectedBookDetails: (book: Book | null) =>
    set((state) => ({ selectedBookDetails: book })),
}));
