import type { NextApiHandler } from "next";
import { setCookie } from "../../../src/server/cookie";
import { withMethodHandlers } from "../../../src/server/utils/interceptor/method-handlers.interceptor";

const LoginHandler: NextApiHandler = async (req, response) =>
  fetch(process.env.API_URL + "/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req.body),
  })
    .then<{ type: "bearer" | string; access_token: string; refresh_token: string }>(async (res) => {
      const json = await res.json();

      if (!res.ok) {
        return response.status(res.status).json(json);
      }

      return json;
    })
    .then((dto) => {
      setCookie(response, "auth", JSON.stringify(dto));

      response.status(200).end();
    })
    .catch((e) => response.status(500).json(e));

export default withMethodHandlers({ method: "POST", handler: LoginHandler })();
