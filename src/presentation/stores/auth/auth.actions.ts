import { LoginModel } from "../../../domain/models/auth/login-model";
import { RegisterModel } from "../../../domain/models/auth/register-model";
import { ValidateTokenModel } from "../../../domain/models/auth/validate-token-model";


export class Login {
  static readonly type = '[Auth] Login';
  constructor(public payload: LoginModel) {}
}

export class Register {
  static readonly type = '[Auth] Register';
  constructor(public payload: RegisterModel) {}
}

export class Logout {
  static readonly type = '[Auth] Logout';
}

export class ValidateToken {
  static readonly type = '[Auth] Validate Token';
  constructor(public payload: ValidateTokenModel) {}
}

export class GetUserProfile {
  static readonly type = '[Auth] Get User Profile';
}
