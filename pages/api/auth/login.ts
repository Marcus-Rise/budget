import type { NextApiHandler } from "next";
import { setAuth, withMethodHandlers } from "../../../src/server/utils/interceptor";
import type { LoginResponseDto } from "../../../src/server/dto";

const LoginHandler: NextApiHandler = async (req, response) =>
  fetch(process.env.API_URL + "/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req.body),
  })
    .then(async (res) => {
      const dto: LoginResponseDto = await res.json();

      if (!res.ok) {
        return response.status(res.status).json(dto);
      }

      setAuth(dto, response);

      return response.status(200).end();
    })
    .catch((e) => response.status(500).json(e));

export default withMethodHandlers({ method: "POST", handler: LoginHandler })();
