import type { NextApiHandler } from "next";
import { removeCookie } from "../../../src/server/cookie";
import {
  applyInterceptors,
  withAuth,
  withMethodHandlers,
} from "../../../src/server/utils/interceptor";
import type { LoginResponseDto } from "../../../src/server/dto";

const LogoutHandler: NextApiHandler = (req, response) => {
  const { auth: stringifyDto } = req.cookies;
  const { access_token, type, refresh_token }: LoginResponseDto = JSON.parse(stringifyDto);

  return fetch(process.env.API_URL + "/api/auth/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${type} ${access_token}`,
    },
    body: JSON.stringify({ refresh_token }),
  })
    .then(async (res) => {
      const json = await res.json();

      if (!res.ok) {
        return response.status(res.status).json(json);
      }

      return json;
    })
    .then(() => {
      removeCookie(response, "auth");

      response.status(200).end();
    });
};

export default applyInterceptors(
  () => {},
  withMethodHandlers({ method: "GET", handler: LogoutHandler }),
  withAuth,
);
