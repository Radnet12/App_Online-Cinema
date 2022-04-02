import { ChangeEvent } from "react";

export interface ISearchPanel {
  searchTerm: string;
  inputHandler: (event: ChangeEvent<HTMLInputElement>) => void;
}
