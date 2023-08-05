import type { IAuthService } from "./auth-service.interface";
import { inject, injectable } from "inversify";
import type { IHttpService } from "../../utils/http";
import { HTTP_SERVICE } from "../../utils/http";

type AuthLoginDto = { login: string; password: string };
type AuthRegistrationDto = { login: string; password: string };
type AuthResetPasswordDto = { login: string };
type AuthChangePasswordDto = { password: string };

@injectable()
class AuthService implements IAuthService {
  constructor(@inject(HTTP_SERVICE) private readonly _http: IHttpService) {}

  async login(dto: AuthLoginDto) {
    await this._http.post("/api/auth/login", {
      body: JSON.stringify(dto),
    });
  }

  async register(dto: AuthRegistrationDto) {
    await this._http.post("/api/auth/register", {
      body: JSON.stringify(dto),
    });
  }

  async logout() {
    await this._http.get("/api/auth/logout", { keepalive: true });
  }

  async resetPassword(dto: AuthResetPasswordDto) {
    await this._http.post("/api/auth/reset-password", {
      body: JSON.stringify(dto),
    });
  }

  async changePasswordFromEmail(dto: AuthChangePasswordDto) {
    const url = new URL(window.location.href);
    const token = url.searchParams.get("token");
    const tokenType = url.searchParams.get("type");

    await this._http.post("/api/auth/change-password", {
      body: JSON.stringify(dto),
      headers: {
        Authorization: `${tokenType} ${token}`,
      },
    });
  }

  async changePassword(dto: AuthChangePasswordDto) {
    await this._http.post("/api/proxy/auth/change-password", {
      body: JSON.stringify(dto),
    });
  }
}

export { AuthService };
export type { AuthLoginDto, AuthRegistrationDto, AuthResetPasswordDto, AuthChangePasswordDto };
