import { UserModel } from "./user-model";

/**
 * Model representing the authentication state.
 */
export interface AuthStateModel {
  user: UserModel | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  token: string | null;
}
