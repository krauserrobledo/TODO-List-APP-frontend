import { UserModel } from '../models/auth/user-model';
import { LoginModel } from '../models/auth/login-model';
import { RegisterModel } from '../models/auth/register-model';
import { ValidateTokenModel } from '../models/auth/validate-token-model';

export abstract class AuthRepository {
  abstract login(model: LoginModel): Promise<UserModel>;
  abstract register(model: RegisterModel): Promise<UserModel>;
  abstract validateToken(model: ValidateTokenModel): Promise<{ valid: boolean }>;
  abstract getCurrentUser(): UserModel | null;
  abstract logout(): void;
  abstract getToken(): string | null;
}
