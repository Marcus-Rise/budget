import type { Interceptor } from "./interceptor";
import httpProxyMiddleware from "next-http-proxy-middleware";
import { removeCookie } from "../../cookie";

const withProxyApi: Interceptor = () => (req, response) =>
  httpProxyMiddleware(req, response, {
    target: process.env.API_URL,
    pathRewrite: [
      {
        patternStr: "^/api/proxy",
        replaceStr: "/api",
      },
    ],
    onProxyInit: (proxy) => {
      /**
       * Check the list of bindable events in the `http-proxy` specification.
       * @see https://www.npmjs.com/package/http-proxy#listening-for-proxy-events
       */
      // proxy.on("proxyReq", (proxyReq, req, res) => {});
      proxy.on("proxyRes", (proxyRes, req, res) => {
        if (proxyRes.statusCode === 401) {
          removeCookie(res, "auth");
        }
      });
    },
  });

export { withProxyApi };
