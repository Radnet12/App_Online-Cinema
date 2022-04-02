import { IconType } from "./icon.type";

export interface IGenre {
  _id: string;
  name: string;
  slug: string;
  description: string;
  icon: IconType;
}
