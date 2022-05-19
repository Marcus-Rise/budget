import type { NextApiHandler } from "next";

const RegisterHandler: NextApiHandler = async (req, response) => {
  if (req.method !== "POST") {
    response.status(405).end();
  } else {
    await fetch(process.env.API_URL + "/api/auth/register", {
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

        return response.status(200).json(json);
      })
      .catch((e) => {
        return response.status(500).json(e);
      });
  }
};

export default RegisterHandler;
