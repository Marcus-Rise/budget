import { Container } from "inversify";
import { UserModule } from "../user/ioc";

const container = new Container();

container.load(UserModule);

export { container };
