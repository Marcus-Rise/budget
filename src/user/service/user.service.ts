import type { IUserService } from "./user.service.interface";
import { inject, injectable } from "inversify";
import type { IHttpService } from "../../utils/http";
import { HTTP_SERVICE } from "../../utils/http";
import type { IUser } from "../user";
import type { IUserStore } from "../store";
import { USER_STORE } from "../store";

@injectable()
class UserService implements IUserService {
  constructor(
    @inject(HTTP_SERVICE) private readonly _http: IHttpService,
    @inject(USER_STORE) private readonly _store: IUserStore,
  ) {}

  async loadCurrentUser(): Promise<void> {
    this._store.isLoading = true;

    const user = await this._http
      .get("/api/auth/me")
      .then((res) => res.json())
      .catch(console.error);

    this._store.user = user ?? null;

    this._store.isLoading = false;
  }

  async deleteAccount() {
    await this._http.delete("/api/proxy/user");
  }
}

export { UserService };
