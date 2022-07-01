type AuthLoginDto = { login: string; password: string };
type AuthRegistrationDto = { login: string; password: string };
type AuthResetPasswordDto = { login: string };
type AuthChangePasswordDto = { password: string };

class AuthService {
  static async login(dto: AuthLoginDto) {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(dto),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error();
    }
  }

  static async register(dto: AuthRegistrationDto) {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(dto),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error();
    }
  }

  static async logout() {
    const res = await fetch("/api/auth/logout", { keepalive: true });

    if (!res.ok) {
      throw new Error();
    }
  }

  static async resetPassword(dto: AuthResetPasswordDto) {
    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      body: JSON.stringify(dto),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error();
    }
  }

  static async changePasswordFromEmail(dto: AuthChangePasswordDto) {
    const url = new URL(window.location.href);
    const token = url.searchParams.get("token");
    const tokenType = url.searchParams.get("type");

    const res = await fetch("/api/auth/change-password", {
      method: "POST",
      body: JSON.stringify(dto),
      headers: {
        "Content-Type": "application/json",
        Authorization: `${tokenType} ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error();
    }
  }

  static async changePassword(dto: AuthChangePasswordDto) {
    const res = await fetch("/api/proxy/auth/change-password", {
      method: "POST",
      body: JSON.stringify(dto),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error();
    }
  }
}

export { AuthService };
export type { AuthLoginDto, AuthRegistrationDto, AuthResetPasswordDto, AuthChangePasswordDto };
