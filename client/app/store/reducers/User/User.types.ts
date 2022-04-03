import { IUser } from "@/types";

export interface IInitialState {
  user: Pick<IUser, "email" | "isAdmin"> | null;
  isLoading: boolean;
}
