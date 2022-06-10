import type { NextApiHandler } from "next";
import { withMethodHandlers } from "../../../src/server/utils/interceptor";

const RegisterHandler: NextApiHandler = async (req, response) =>
  fetch(process.env.API_URL + "/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req.body),
  })
    .then(async (res) => {
      const json = await res.json();

      return response.status(res.status).json(json);
    })
    .catch((e) => response.status(500).json(e));

export default withMethodHandlers({ method: "POST", handler: RegisterHandler })();
