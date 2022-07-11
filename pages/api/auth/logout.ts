import type { NextApiHandler } from "next";
import {
  applyInterceptors,
  parseAuth,
  removeAuth,
  withAuth,
  withMethodHandlers,
} from "../../../src/server/utils/interceptor";

const LogoutHandler: NextApiHandler = (req, response) => {
  const auth = parseAuth(req);

  if (!auth) {
    return response.status(401).json({ error: "Unauthorized" });
  }

  const { access_token, type, refresh_token } = auth;

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
      removeAuth(response);

      response.status(200).end();
    });
};

export default applyInterceptors(
  () => {},
  withAuth,
  withMethodHandlers({ method: "GET", handler: LogoutHandler }),
);
