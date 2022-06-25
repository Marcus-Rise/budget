import type { Interceptor } from "./interceptor";
import type { LoginResponseDto } from "../../dto";
import { getCookies, removeCookie, setCookie } from "../cookie.helper";
import jwtDecode from "jwt-decode";

const withAuth: Interceptor =
  (handler = () => {}) =>
  async (req, response) => {
    const stringifyDto = getCookies(req, "auth");

    if (!stringifyDto) {
      removeCookie(response, "auth");

      return response.status(401).json({ error: "Unauthorized" });
    }

    const auth: LoginResponseDto = JSON.parse(stringifyDto);

    if (!auth.access_token || !auth.refresh_token) {
      removeCookie(response, "auth");

      return response.status(401).json({ error: "Unauthorized" });
    }

    const accessTokenBody = jwtDecode<{
      username: string;
      id: number;
      iat: number;
      exp: number;
      aud: string;
      iss: string;
      sub: string;
    }>(auth.access_token);
    const refreshTokenBody = jwtDecode<{
      iat: number;
      exp: number;
      aud: string;
      iss: string;
      sub: string;
      jti: string;
    }>(auth.refresh_token);

    /**
     * milliseconds
     */
    const now = Date.now();

    if (refreshTokenBody.exp * 1000 < now) {
      removeCookie(response, "auth");

      return response.status(401).json("Session expired");
    }

    if (accessTokenBody.exp * 1000 < now) {
      const { access_token, type } = await fetch(process.env.API_URL + "/api/auth/refresh", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh_token: auth.refresh_token }),
      }).then<Omit<LoginResponseDto, "refresh_token">>(async (res) => {
        const json = await res.json();

        if (!res.ok) {
          return response.status(res.status).json(json);
        }

        return json;
      });

      auth.access_token = access_token;
      auth.type = type;

      setCookie(response, "auth", JSON.stringify(auth));
    }

    req.headers.authorization = `${auth.type} ${auth.access_token}`;

    return handler(req, response);
  };

export { withAuth };
