import type { NextApiHandler } from "next";
import { setCookie } from "../../../src/server/cookie";

const LoginHandler: NextApiHandler = async (req, response) => {
  if (req.method !== "POST") {
    response.status(405).end();
  } else {
    const { access_token } = await fetch(process.env.API_URL + "/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    })
      .then(async (res) => {
        const json = await res.json();

        if (!res.ok) {
          return response.status(res.status).json(json);
        }

        return json;
      })
      .catch((e) => {
        return response.status(500).json(e);
      });

    setCookie(response, "auth", access_token);

    response.status(200).end();
  }
};

export default LoginHandler;
