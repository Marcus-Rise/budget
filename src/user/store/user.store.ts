import type { IUserStore } from "./user.store.interface";
import { makeAutoObservable } from "mobx";
import { injectable } from "inversify";
import type { IUser } from "../user";

@injectable()
class UserStore implements IUserStore {
  isLoading: boolean = false;
  user: IUser | null = null;

  constructor() {
    makeAutoObservable(this);
  }
}

export { UserStore };
