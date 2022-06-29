import { withProxyApi } from "../../../src/server/utils/interceptor";

const config = {
  api: {
    externalResolver: true,
  },
};

export default withProxyApi();
export { config };
