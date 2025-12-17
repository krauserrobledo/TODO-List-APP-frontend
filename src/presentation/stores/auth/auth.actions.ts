import { LoginModel } from "../../../domain/models/auth/login-model";
import { RegisterModel } from "../../../domain/models/auth/register-model";
import { ValidateTokenModel } from "../../../domain/models/auth/validate-token-model";

/** Action to log in a user */
export class Login {
  static readonly type = '[Auth] Login';
  constructor(public payload: LoginModel) {}
}

/** Action to register a new user */
export class Register {
  static readonly type = '[Auth] Register';
  constructor(public payload: RegisterModel) {}
}

/** Action to log out a user */
export class Logout {
  static readonly type = '[Auth] Logout';
}

/** Action to validate an authentication token */
export class ValidateToken {
  static readonly type = '[Auth] Validate Token';
  constructor(public payload: ValidateTokenModel) {}
}

/** Action to get the user profile */
export class GetUserProfile {
  static readonly type = '[Auth] Get User Profile';
}

/** Action to hydrate user data from storage */
export class HydrateUser {
  static readonly type = '[Auth] Hydrate User';
}
