import { Book } from "@/types/Book";
import { create } from "zustand";

interface MainStore {
  selectedBookDetails: Book | null;
  setSelectedBookDetails: (book: Book) => void;
}

const useMainStore = create<MainStore>()((set) => ({
  selectedBookDetails: null,
  setSelectedBookDetails: (book: Book) =>
    set((state) => ({ selectedBookDetails: book })),
}));
