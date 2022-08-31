import { ContainerModule } from "inversify";
import type { IUserStore } from "../store";
import { USER_STORE } from "../store";
import { UserStore } from "../store/user.store";
import type { IUserService } from "../service";
import { USER_SERVICE } from "../service";
import { UserService } from "../service/user.service";
import type { IHttpService } from "../../utils/http";
import { HTTP_SERVICE } from "../../utils/http";
import { HttpService } from "../../utils/http/http.service";

const UserModule = new ContainerModule((bind) => {
  bind<IHttpService>(HTTP_SERVICE).to(HttpService);
  bind<IUserStore>(USER_STORE).to(UserStore).inSingletonScope();
  bind<IUserService>(USER_SERVICE).to(UserService).inSingletonScope();
});

export { UserModule };
