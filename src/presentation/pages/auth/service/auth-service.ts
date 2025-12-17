import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginModel } from "../../../../domain/models/auth/login-model";
import { RegisterModel } from "../../../../domain/models/auth/register-model";
import { ValidateTokenModel } from "../../../../domain/models/auth/validate-token-model";
import { UserModel } from "../../../../domain/models/auth/user-model";
import { GetUserProfileUseCase } from "../../../../domain/usecases/auth/get-user-profile-usecase";
import { LoginUseCase } from "../../../../domain/usecases/auth/login-usecase";
import { LogoutUseCase } from "../../../../domain/usecases/auth/logout-usecase";
import { RegisterUseCase } from "../../../../domain/usecases/auth/register-usecase";
import { ValidateTokenUseCase } from "../../../../domain/usecases/auth/validate-token-usecase";

/**
 * AuthService provides authentication-related operations
 * such as login, logout, registration, token validation,
 * and fetching user profile information.
 * It acts as a bridge between the presentation layer
 * and the domain layer use cases.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private logoutUseCase: LogoutUseCase,
    private loginUseCase: LoginUseCase,
    private registerUseCase: RegisterUseCase,
    private getUserProfileUseCase: GetUserProfileUseCase,
    private validateTokenUseCase: ValidateTokenUseCase
  ) {}

  login(model: LoginModel): Observable<UserModel> {
    return this.loginUseCase.execute(model);
  }

  logout(): Observable<void> {
    return this.logoutUseCase.execute();
  }

  register(model: RegisterModel): Observable<UserModel> {
    return this.registerUseCase.execute(model);
  }

  getUserProfile(): Observable<UserModel | null> {
    return this.getUserProfileUseCase.execute();
  }

  validateToken(model: ValidateTokenModel): Observable<{ valid: boolean }> {
    return this.validateTokenUseCase.execute(model);
  }
}
