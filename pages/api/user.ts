import type { NextApiHandler } from "next";
import type { IUser } from "../../src/user";

const UserHandler: NextApiHandler<IUser | { error: string }> = async (req, res) => {
  const { auth } = req.cookies;

  if (!auth) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  res.json({
    email: "some@somes.com",
  });
};

export default UserHandler;
