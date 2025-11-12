import { Injectable } from "@angular/core";
import { LoginModel } from "../../domain/models/auth/login-model";
import { RegisterModel } from "../../domain/models/auth/register-model";
import { ValidateTokenModel } from "../../domain/models/auth/validate-token-model";
import { GetUserProfileUseCase } from "../../domain/usecases/auth/get-user-profile-usecase";
import { LoginUseCase } from "../../domain/usecases/auth/login-usecase";
import { LogoutUseCase } from "../../domain/usecases/auth/logout-usecase";
import { RegisterUseCase } from "../../domain/usecases/auth/register-usecase";
import { ValidateTokenUseCase } from "../../domain/usecases/auth/validate-token-usecase";

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(
    private logoutUseCase: LogoutUseCase,
    private loginUseCase: LoginUseCase,
    private registerUseCase: RegisterUseCase,
    private getUserProfileUseCase: GetUserProfileUseCase,
    private validateTokenUseCase: ValidateTokenUseCase
  ) {}

  login(model: LoginModel) {
    return this.loginUseCase.execute(model);
  }

  logout() {
    return this.logoutUseCase.execute();
  }

  register(model: RegisterModel) {
    return this.registerUseCase.execute(model);
  }

  getUserProfile() {
    return this.getUserProfileUseCase.execute();
  }

  validateToken(model: ValidateTokenModel) {
    return this.validateTokenUseCase.execute(model);
  }
}
