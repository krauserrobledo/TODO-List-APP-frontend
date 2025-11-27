import { UserModel } from '../models/auth/user-model';
import { LoginModel } from '../models/auth/login-model';
import { RegisterModel } from '../models/auth/register-model';
import { ValidateTokenModel } from '../models/auth/validate-token-model';
import { Observable } from 'rxjs';

export abstract class AuthRepository {
  abstract login(model: LoginModel): Observable<UserModel>;
  abstract register(model: RegisterModel): Observable<UserModel>;
  abstract validateToken(model: ValidateTokenModel): Observable<{ valid: boolean }>;
  abstract getCurrentUser(): UserModel | null;
  abstract logout(): void;
  abstract getToken(): string | null;
}
