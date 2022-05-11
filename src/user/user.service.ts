import type { IUser } from "./user";

const getUser = (): Promise<IUser> =>
  fetch("/api/user").then((res) => {
    if (!res.ok) {
      throw new Error();
    }

    return res.json();
  });

export { getUser };
