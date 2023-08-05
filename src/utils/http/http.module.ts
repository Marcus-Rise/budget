import { ContainerModule } from "inversify";
import type { IHttpService } from "./http.service.interface";
import { HTTP_SERVICE } from "./http.service.provider";
import { HttpService } from "./http.service";

const HttpModule = new ContainerModule((bind) => {
  bind<IHttpService>(HTTP_SERVICE).to(HttpService);
});

export { HttpModule };
