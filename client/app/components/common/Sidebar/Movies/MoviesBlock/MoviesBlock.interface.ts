import { AxiosResponse } from "axios";

import { IMovie } from "@/types";

export interface IMoviesBlock {
  link: string;
  title: string;
  query: () => Promise<AxiosResponse<IMovie[] | []>>;
}
