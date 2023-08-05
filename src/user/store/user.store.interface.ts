import type { IUser } from "../user";

interface IUserStore {
  user: IUser | null;
  isLoading: boolean;
}

export type { IUserStore };
