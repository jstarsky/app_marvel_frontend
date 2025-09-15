import { User } from "@/store/types";

export interface LoginFormData {
  username: string;
  password: string;
};

export interface LoginResponse {
  user: User;
  token: string;
}
