import { IMenuItem } from "../MenuItem/MenuItem.interface";

export interface IMenuBlock {
  title: string;
  items: IMenuItem[];
  isLoading?: boolean;
}

export interface IMenuBlockProps {
  menu: IMenuBlock;
  isLoading?: boolean;
  count?: number;
}
