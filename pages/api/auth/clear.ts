import type { NextApiHandler } from "next";
import { removeAuth } from "../../../src/server/utils/interceptor";

const Clear: NextApiHandler = (req, res) => removeAuth(res).status(200).end();

export default Clear;
