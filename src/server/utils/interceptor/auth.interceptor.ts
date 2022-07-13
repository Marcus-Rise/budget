import type { Interceptor } from "./interceptor";
import type { LoginResponseDto } from "../../dto";
import { getCookies, removeCookie, setCookie } from "../cookie.helper";
import jwtDecode from "jwt-decode";
import type { NextApiRequest, NextApiResponse } from "next";
import type { StringValue } from "ms";
import ms from "ms";

type JwtPayload = {
  username: string;
  id: number;
  role: string;
};

type SessionTTL = StringValue;

const SESSION_TTL: number = ms(process.env.SESSION_TTL as SessionTTL) / 1000;

const COOKIE_AUTH_KEY = "auth";

const parseAuth = (req: NextApiRequest): LoginResponseDto | null => {
  const stringifyDto = getCookies(req, COOKIE_AUTH_KEY);

  if (!stringifyDto) {
    return null;
  }

  const auth: LoginResponseDto = JSON.parse(stringifyDto);

  if (!auth.access_token || !auth.refresh_token) {
    return null;
  }

  return auth;
};

const removeAuth = (response: NextApiResponse) => removeCookie(response, COOKIE_AUTH_KEY);

const setAuth = (dto: LoginResponseDto, response: NextApiResponse) =>
  setCookie(response, COOKIE_AUTH_KEY, JSON.stringify(dto), {
    maxAge: SESSION_TTL,
  });

const parseJwtPayload = (req: NextApiRequest): JwtPayload => {
  const auth = parseAuth(req);

  if (!auth) {
    throw new Error();
  }

  return jwtDecode<JwtPayload>(auth.access_token);
};

const withAuth: Interceptor =
  (handler = () => {}) =>
  async (req, response) => {
    const auth = parseAuth(req);

    if (!auth) {
      removeAuth(response);

      return response.status(401).json({ error: "Unauthorized" });
    }

    const accessTokenBody = jwtDecode<
      JwtPayload & {
        iat: number;
        exp: number;
        aud: string;
        iss: string;
        sub: string;
      }
    >(auth.access_token);
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
      removeAuth(response);

      return response.status(401).json("Session expired");
    }

    if (accessTokenBody.exp * 1000 < now) {
      const res = await fetch(process.env.API_URL + "/api/auth/refresh", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh_token: auth.refresh_token }),
      });

      const json: Omit<LoginResponseDto, "refresh_token"> = await res.json();

      if (!res.ok) {
        removeAuth(response);

        return response.status(res.status).json(json);
      }

      auth.access_token = json.access_token;
      auth.type = json.type;

      setAuth(auth, response);
    }

    req.headers.authorization = `${auth.type} ${auth.access_token}`;

    return handler(req, response);
  };

export { withAuth, parseAuth, removeAuth, setAuth, parseJwtPayload };
