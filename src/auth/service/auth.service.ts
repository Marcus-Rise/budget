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
    const res = await fetch("/api/auth/proxy/reset-password", {
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

  static async changePassword(dto: AuthChangePasswordDto) {
    const res = await fetch("/api/auth/proxy/change-password", {
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
