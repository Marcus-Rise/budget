import type { NextApiHandler } from "next";
import { applyInterceptors, withMethodHandlers } from "../../../src/server/utils/interceptor";

const EmailConfirm: NextApiHandler = (req, response) => {
  const accessToken = req.query.token;
  const tokenType = req.query.type;

  return fetch(process.env.API_URL + "/api/auth/email-confirm", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${tokenType} ${accessToken}`,
    },
  })
    .then(async (res) => {
      const json = await res.json();

      if (!res.ok) {
        return response.status(res.status).json(json);
      }

      response.status(200).end();
    })
    .catch((e) => response.status(500).json(e));
};

export default applyInterceptors(
  () => {},
  withMethodHandlers({
    method: "GET",
    handler: EmailConfirm,
  }),
);
