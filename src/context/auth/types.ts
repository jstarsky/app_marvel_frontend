
import { ApiResponse } from "@/lib/api";
import { User } from "@/store/types";

export interface LoginResponse {
  user: User;
  token: string;
}


export interface AuthContextType {
    login: (username: string, password: string) => Promise<ApiResponse<LoginResponse>>;
    register: (username: string, password: string, password_confirm: string) => Promise<ApiResponse<LoginResponse>>;
    logout: () =>  Promise<ApiResponse>;
    loading: boolean;
    isAuthenticated: boolean;
}