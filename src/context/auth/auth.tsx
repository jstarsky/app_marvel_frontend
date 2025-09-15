import {
  Suspense,
  ReactNode,
  createContext,
  useState,
  useContext,
  useEffect,
} from "react";
import { AuthContextType, LoginResponse } from "./types";
import { useDispatch, useSelector } from "react-redux";
import { UserAction, UserState } from "@/store/types";
import { useRouter } from "next/navigation";
import { ApiResponse, useApi } from "@/lib/api";
import { Dispatch } from "@reduxjs/toolkit";
import { actionLogin } from "@/store/actions";
import { actionLogout } from "@/store/actions";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children?: ReactNode }) {
  const { loading: loadingApi, post } = useApi();
  const dispatch = useDispatch<Dispatch<UserAction>>();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const token = useSelector<
    { userReducer: UserState },
    string | null | undefined
  >((state) => state?.userReducer?.token);
  const router = useRouter();

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
    } else {
      router.replace("/auth/login");
    }
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  async function login(
    username: string,
    password: string
  ): Promise<ApiResponse<LoginResponse>> {
    const response = await post<LoginResponse>("/auth/login/", {
      username,
      password,
    });
    if (response.data && response.success) {
      dispatch(actionLogin(response.data.user, response.data.token));
      router.replace("/characters");
    }
    return response;
  }

  async function register(
    username: string,
    password: string,
    password_confirm: string
  ): Promise<ApiResponse<LoginResponse>> {
    const response = await post<LoginResponse>("/auth/register/", {
      username,
      password,
      password_confirm,
    });
    if (response.data && response.success) {
      dispatch(actionLogin(response.data.user, response.data.token));
      router.replace("/characters");
    }
    return response;
  }

  async function logout(): Promise<ApiResponse> {
    const response = await post("/auth/logout/");
    if (response.success) {
      setIsAuthenticated(false);
      dispatch(actionLogout());
      router.replace("/auth/login");
    }
    return response;
  }

  return (
    <AuthContext.Provider
      value={{ login, logout, register, isAuthenticated, loading: loading || loadingApi }}
    >
      <Suspense fallback={<div>Suspense Loading...</div>}>{children}</Suspense>
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
