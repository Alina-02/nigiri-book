import { MainStore } from "@/store/mainStore";
import { Book } from "@/types/Book";

/**
 * Updates a single book's 'lastOpened' timestamp, and sorts the entire books array.
 * @param state The current state of the MainStore.
 * @param bookToOpen The book that was just opened.
 * @returns An object containing the new 'books' array and 'selectedBookDetails' object.
 */
export const updateBookOnOpen = (
  state: Pick<MainStore, "books" | "selectedBookDetails">, // Only need these properties from state
  bookToOpen: Book
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

  // 3. Create a new copy of the books array (immutability)
  const updatedBooks = [...state.books];

  if (bookIndex !== -1) {
    // Found: Replace the old book with the updated one
    updatedBooks[bookIndex] = bookWithTimestamp;
  } else {
    // Not Found: Add the book (optional, depending on your app logic)
    updatedBooks.push(bookWithTimestamp);
  }

  // 4. Sort the updated array in descending order
  const sortedBooks = updatedBooks.sort((a, b) => {
    const timeA = a.lastOpened || 0;
    const timeB = b.lastOpened || 0;
    return timeB - timeA; // Descending sort (newest first)
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
