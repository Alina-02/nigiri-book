import { Book } from "epubjs";

export interface BookData {
  title: string;
  author: string;
  initDate: Date[];
  endDate: Date[];
  description?: string;
  valoration?: number;
  review?: string;
  quotes: string[];
  comments: Comment[];
  cover?: string;
  state: BookState;
  saga?: string;
  progressPage: number;
  progressPercentage: number;
  favourite: boolean;
  file?: string;
  lastOpened?: number;
  epub?: Book;
}

export enum BookState {
  Reading = "READING",
  Read = "READ",
  Pendant = "PENDANT",
}

export interface Comment {
  page: number;
  text: string;
}
