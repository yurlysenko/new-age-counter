import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import { backendApi } from "../../libs/axios.ts";
import { IAuthContext, IJwtPayload, ILoginDto } from "./types";
import { LS_ACCESS_TOKEN_KEY } from "./constants";

export const AuthContext = createContext({} as IAuthContext);

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [payload, setPayload] = useState<IJwtPayload>();

  useEffect(() => {
    try {
      const storageValue = localStorage.getItem(LS_ACCESS_TOKEN_KEY);
      const payload = storageValue ? JSON.parse(storageValue) : undefined;

      if (payload) {
        setAuthenticated(true);
        setPayload(payload);
      } else {
        setAuthenticated(false);
      }
    } catch (e) {
      setAuthenticated(false);
      localStorage.removeItem(LS_ACCESS_TOKEN_KEY);
    }
  }, []);

  const login = useCallback(async (dto: ILoginDto): Promise<void> => {
    const response = await backendApi.post("/auth/login", dto);

    const payload: IJwtPayload = response.data;

    if (response.status !== 201) {
      return;
    }

    localStorage.setItem(LS_ACCESS_TOKEN_KEY, JSON.stringify(payload));
    setPayload(payload);
    setAuthenticated(true);
  }, []);

  const logout = useCallback(async (): Promise<void> => {
    localStorage.removeItem(LS_ACCESS_TOKEN_KEY);
    setPayload(undefined);
    setAuthenticated(false);
  }, []);

  return (
    <AuthContext.Provider
      children={children}
      value={{
        authenticated,
        login,
        logout,
        payload,
      }}
    />
  );
};
