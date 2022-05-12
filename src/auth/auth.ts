const useAuth = () => {
  const login = async (dto: { login: string; password: string }) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(dto),
    });

    if (!res.ok) {
      throw new Error();
    }
  };

  const register = async (dto: { login: string; password: string }) => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(dto),
    });

    if (!res.ok) {
      throw new Error();
    }
  };

  return {
    login,
    register,
  };
};

export { useAuth };
