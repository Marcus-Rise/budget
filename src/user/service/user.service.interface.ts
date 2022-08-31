interface IUserService {
  loadCurrentUser(): Promise<void>;

  deleteAccount(): Promise<void>;
}

export type { IUserService };
