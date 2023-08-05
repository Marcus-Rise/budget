import type {
  AuthChangePasswordDto,
  AuthLoginDto,
  AuthRegistrationDto,
  AuthResetPasswordDto,
} from "./auth.service";

interface IAuthService {
  login(dto: AuthLoginDto): Promise<void>;

  register(dto: AuthRegistrationDto): Promise<void>;

  logout(): Promise<void>;

  resetPassword(dto: AuthResetPasswordDto): Promise<void>;

  changePasswordFromEmail(dto: AuthChangePasswordDto): Promise<void>;

  changePassword(dto: AuthChangePasswordDto): Promise<void>;
}

export type { IAuthService };
