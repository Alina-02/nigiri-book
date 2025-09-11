export interface Book {
  title: string;
  author: string;
  initDate: Date[];
  endDate: Date[];
  description?: string;
  valoration?: number;
  review?: string;
  quotes: string[];
  comments: string[];
  cover?: string;
  state: BookState;
  saga?: string;
  progressPage: number;
  favourite: boolean;
}

export enum BookState {
  Reading = "READING",
  Read = "READ",
  Pendant = "PENDANT",
}
