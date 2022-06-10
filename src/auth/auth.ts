const useAuth = () => {
  const login = async (dto: { login: string; password: string }) => {
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
  };

  const logout = () => fetch("/api/auth/logout");

  const register = async (dto: { login: string; password: string }) => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(dto),
      headers: {
        "Content-Type": "application/json",
      },
      keepalive: true,
    });

    if (!res.ok) {
      throw new Error();
    }
  };

  return {
    login,
    logout,
    register,
  };
};

export { useAuth };
