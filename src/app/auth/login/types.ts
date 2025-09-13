import { User } from "@/store/types";

export interface LoginResponse {
  user: User;
  token: string;
}
