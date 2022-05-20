import type { NextApiHandler } from "next";
import type { IUser } from "../../src/user";

const UserHandler: NextApiHandler<IUser | { error: string }> = async (req, response) => {
  if (req.method !== "GET") {
    response.status(405).end();
  } else {
    const { auth: token } = req.cookies;

    if (!token) {
      return response.status(401).json({ error: "Unauthorized" });
    }

    const user: { login: string } = await fetch(process.env.API_URL + "/api/user", {
      method: "GET",
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

    response.json({
      login: user.login,
    });
  }
};

export default UserHandler;
