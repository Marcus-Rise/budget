import type { Interceptor } from "./interceptor";
import type { LoginResponseDto } from "../../dto";
import { removeCookie } from "../../cookie";

const withAuth: Interceptor =
  (handler = () => {}) =>
  (req, res) => {
    const { auth: stringifyDto } = req.cookies;

    if (!stringifyDto) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const dto: LoginResponseDto = JSON.parse(stringifyDto);

    if (!dto.access_token || !dto.refresh_token) {
      removeCookie(res, "auth");

      return res.status(401).json({ error: "Unauthorized" });
    }

    req.headers.authorization = `${dto.type} ${dto.access_token}`;

    return handler(req, res);
  };

export { withAuth };
