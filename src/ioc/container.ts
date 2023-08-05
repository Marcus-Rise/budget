import { Container } from "inversify";
import { AuthModule } from "../auth/ioc";
import { HttpModule } from "../utils/http/http.module";

const container = new Container({ defaultScope: "Singleton" });

container.load(HttpModule, AuthModule);

export { container };
