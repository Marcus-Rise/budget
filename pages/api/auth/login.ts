import type { NextApiHandler } from "next";
import { setCookie } from "../../../src/server/cookie";
import { withMethodHandlers } from "../../../src/server/utils/interceptor";
import type { LoginResponseDto } from "../../../src/server/dto";

const LoginHandler: NextApiHandler = async (req, response) =>
  fetch(process.env.API_URL + "/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req.body),
  })
    .then<LoginResponseDto>(async (res) => {
      const json = await res.json();

      if (!res.ok) {
        return response.status(res.status).json(json);
      }

      return json;
    })
    .then((dto) => {
      if (dto) {
        setCookie(response, "auth", JSON.stringify(dto));

        response.status(200).end();
      }
    })
    .catch((e) => response.status(500).json(e));

export default withMethodHandlers({ method: "POST", handler: LoginHandler })();
