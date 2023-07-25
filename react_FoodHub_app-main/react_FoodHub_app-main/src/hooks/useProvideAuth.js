import { useState } from "react";

const useProvideAuth = () => {
  const [user, setUser] = useState(null);

  const login = async () => {
    setUser({ name: "Guest User", email: "guest@gmail.com" });
  };

  const logout = async () => {
    setUser(null);
  };

  return { user, login, logout };
};

export default useProvideAuth;
