import { UserModel } from "./user-model";

export interface AuthStateModel {
    user: UserModel | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    token: string | null;
  }