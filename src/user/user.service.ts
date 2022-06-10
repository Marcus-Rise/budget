import type { IUser } from "./user";

class UserService {
  static get(): Promise<IUser> {
    return fetch("/api/proxy/user").then((res) => {
      if (!res.ok) {
        throw new Error();
      }

      return res.json();
    });
  }

  static remove() {
    return fetch("/api/proxy/user", {
      method: "DELETE",
    }).then((res) => {
      if (!res.ok) {
        throw new Error();
      }

      return res.json();
    });
  }
}

export { UserService };
