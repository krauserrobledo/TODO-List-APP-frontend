import { UserEntity } from "./user-entity";

export interface AuthCredentials {
    email: string;
    password: string;
  }
  
  export interface AuthResponse {
    user: UserEntity;
    token: string;
    refreshToken: string;
    expiresIn: number;
  }