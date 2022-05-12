import type { NextApiHandler } from "next";

const RegisterHandler: NextApiHandler = (req, res) => {
  res.status(200).end();
};

export default RegisterHandler;
