import type { Interceptor } from "./interceptor";
import httpProxyMiddleware from "next-http-proxy-middleware";

const withProxyApi: Interceptor = () => (req, res) =>
  httpProxyMiddleware(req, res, {
    target: process.env.API_URL,
    pathRewrite: [
      {
        patternStr: "^/api/proxy",
        replaceStr: "/api",
      },
    ],
  });

export { withProxyApi };
