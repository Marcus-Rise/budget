import { withAuth, withProxyApi } from "../../../src/server/utils/interceptor";
import { applyInterceptors } from "@marcus-rise/next-api-interceptor";

const config = {
  api: {
    externalResolver: true,
  },
};

export default applyInterceptors(() => {}, withAuth, withProxyApi);

export { config };
