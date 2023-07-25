import { createContext, useContext } from "react";
import useProvideAuth from "../hooks/useProvideAuth";

const intialValue = {
  user: null,
  login: () => {},
  logout: () => {},
};
export const userContext = createContext(intialValue);
userContext.displayName = "userContext";

export const AuthProvider = ({ children }) => {
  const auth = useProvideAuth();
  return <userContext.Provider value={auth}>{children}</userContext.Provider>;
};

export const useAuth = () => {
  return useContext(userContext);
};
