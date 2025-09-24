declare const MAIN_WINDOW_VITE_DEV_SERVER_URL: string;
declare const MAIN_WINDOW_VITE_NAME: string;

declare interface Window {
  api: {
    showOpenBook: () => void;
    getBooksData: () => Promise<Books[]>;
    getBookFile: (filePath: string) => Promise<string | undefined>;
    updateBookData: (filePath: string, newBookData: book) => Promise<void>;
  };
}
