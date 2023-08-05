import { ContainerModule } from "inversify";
import type { IAuthService } from "../service";
import { AUTH_SERVICE } from "../service";
import { AuthService } from "../service/auth.service";

const AuthModule = new ContainerModule((bind) => {
  bind<IAuthService>(AUTH_SERVICE).to(AuthService);
});

export { AuthModule };
