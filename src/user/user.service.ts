import type { IUser } from "./user";

const getUser = (): Promise<IUser> => fetch("/api/user").then((res) => res.json());

export { getUser };
