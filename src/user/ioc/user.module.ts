import { AsyncContainerModule } from "inversify";
import type { IUserStore } from "../store";
import { USER_STORE } from "../store";
import type { IUserService } from "../service";
import { USER_SERVICE } from "../service";
import type { IHttpService } from "../../utils/http";
import { HTTP_SERVICE } from "../../utils/http";

const UserModule = new AsyncContainerModule(async (bind) => {
  const [{ UserStore }, { UserService }, { HttpService }] = await Promise.all([
    import("../store/user.store"),
    import("../service/user.service"),
    import("../../utils/http/http.service"),
  ]);

  bind<IHttpService>(HTTP_SERVICE).to(HttpService);
  bind<IUserStore>(USER_STORE).to(UserStore).inSingletonScope();
  bind<IUserService>(USER_SERVICE).to(UserService).inSingletonScope();
});

export { UserModule };
