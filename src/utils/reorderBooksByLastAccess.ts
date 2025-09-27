import { MainStore } from "@/store/mainStore";
import { BookData } from "@/types/Book";

/**
 * Updates a single book's 'lastOpened' timestamp, and sorts the entire books array.
 * @param state The current state of the MainStore.
 * @param bookToOpen The book that was just opened.
 * @returns An object containing the new 'books' array and 'selectedBookDetails' object.
 */
export const updateBookOnOpen = (
  state: Pick<MainStore, "books" | "selectedBookDetails">,
  bookToOpen: BookData
): Pick<MainStore, "books" | "selectedBookDetails"> => {
  // 1. Create the new book data with the timestamp
  const bookWithTimestamp = {
    ...bookToOpen,
    lastOpened: Date.now(), // Update timestamp
  };

  // 2. Find the index of the book
  const bookIndex = state.books.findIndex(
    (b) => b.file === bookWithTimestamp.file
  );

  // 3. Create a new copy of the books array
  const updatedBooks = [...state.books];

  if (bookIndex !== -1) {
    updatedBooks[bookIndex] = bookWithTimestamp;
  } else {
    updatedBooks.push(bookWithTimestamp);
  }

  // 4. Sort the updated array in descending order
  const sortedBooks = updatedBooks.sort((a, b) => {
    const timeA = a.lastOpened || 0;
    const timeB = b.lastOpened || 0;
    return timeB - timeA;
  });

  // 5. Return the new state structure
  return {
    books: sortedBooks,
    selectedBookDetails: bookWithTimestamp,
  };
};

// Handle case where book is set to null
export const clearSelectedBookDetails = () => ({
  selectedBookDetails: null,
});
