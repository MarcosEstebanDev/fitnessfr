export interface LoginForm {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  avatarUrl?: string;
}

export interface AuthResponse {
  user: AuthUser;
  token: string;
}

export interface ApiError {
  message: string;
  code?: string;
}