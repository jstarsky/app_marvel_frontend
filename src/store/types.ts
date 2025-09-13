
export interface Action {
  type: string;
}

export interface UserAction extends Action {
    token?: string | null;
    user?: User | null;
}

export interface Profile {
  phone?: string;
  avatar?: string;
  bio?: string;
}

export interface User {
    id: string;
    username: string;
    email?: string;
    is_active?: boolean;
    created_at?: string;
    profile: Profile;
}
export interface UserState {
  token?: string | null;
  user?: User | null;
}