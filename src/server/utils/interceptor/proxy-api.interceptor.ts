import type { Interceptor } from "./interceptor";
import type { NextHttpProxyMiddlewareOptions } from "next-http-proxy-middleware";
import httpProxyMiddleware from "next-http-proxy-middleware";

const proxyOptions: NextHttpProxyMiddlewareOptions = {
  target: process.env.API_URL,
  pathRewrite: [
    {
      patternStr: "^/api/proxy",
      replaceStr: "/api",
    },
  ],
};

const withProxyApi: Interceptor = () => (req, response) =>
  httpProxyMiddleware(req, response, proxyOptions);

export { withProxyApi };
