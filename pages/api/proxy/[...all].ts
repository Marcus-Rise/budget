import { applyInterceptors, withAuth, withProxyApi } from "../../../src/server/utils/interceptor";

const config = {
  api: {
    externalResolver: true,
  },
};

export default applyInterceptors(() => {}, withAuth, withProxyApi);

export { config };
