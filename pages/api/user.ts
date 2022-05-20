import type { NextApiHandler } from "next";
import type { IUser } from "../../src/user";
import { removeCookie } from "../../src/server/cookie";

const apiUrl = process.env.API_URL + "/api/user";

const UserHandler: NextApiHandler<IUser | { error: string }> = async (req, response) => {
  const { auth: token } = req.cookies;

  if (!token) {
    return response.status(401).json({ error: "Unauthorized" });
  }

  switch (req.method) {
    case "GET": {
      const user: { login: string } = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(async (res) => {
          if (res.status === 401) {
            removeCookie(response, "auth");
          }

          const json = await res.json();

          if (!res.ok) {
            return response.status(res.status).json(json);
          }

          return json;
        })
        .catch((e) => {
          return response.status(500).json(e);
        });

      response.json({
        login: user.login,
      });
      break;
    }
    case "DELETE": {
      const res = await fetch(apiUrl, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
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

      response.json(res);

      break;
    }
    default:
      response.status(405).end();
      break;
  }
};

export default UserHandler;
