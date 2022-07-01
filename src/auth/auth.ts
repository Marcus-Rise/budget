import type {
  AuthChangePasswordDto,
  AuthLoginDto,
  AuthRegistrationDto,
  AuthResetPasswordDto,
} from "./service";
import { AuthService } from "./service";

const useAuth = () => {
  const login = (dto: AuthLoginDto) => AuthService.login(dto);

  const logout = () => AuthService.logout();

  const register = (dto: AuthRegistrationDto) => AuthService.register(dto);

  const resetPassword = (dto: AuthResetPasswordDto) => AuthService.resetPassword(dto);

  const changePasswordFromEmail = (dto: AuthChangePasswordDto) =>
    AuthService.changePasswordFromEmail(dto);
  const changePassword = (dto: AuthChangePasswordDto) => AuthService.changePassword(dto);

  return {
    login,
    logout,
    register,
    resetPassword,
    changePasswordFromEmail,
    changePassword,
  };
};

export { useAuth };
