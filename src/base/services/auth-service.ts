import { Injectable } from "@angular/core";
import { ValidateTokenRequestDto } from "../../data/models/dtos/auth/validate-token-request-dto";
import { LoginUseCase } from "../../domain/usecases/auth/login-usecase";
import { RegisterUseCase } from "../../domain/usecases/auth/register-usecase";
import { LoginRequestDto } from "../../data/models/dtos/auth/login-request-dto";
import { LogoutUseCase } from "../../domain/usecases/auth/logout-usecase";
import { RegisterRequestDto } from "../../data/models/dtos/auth/register-request-dto";
import { ValidateTokenUseCase } from "../../domain/usecases/auth/validate-token-usecase";
import { GetUserProfileUseCase } from "../../domain/usecases/auth/get-user-profile-usecase";

@Injectable({ providedIn: 'root' })
export class AuthService {

    constructor(
    private logoutUseCase: LogoutUseCase,
    private loginUseCase: LoginUseCase,
    private registerUseCase: RegisterUseCase,
    private getUserProfileUseCase : GetUserProfileUseCase,
    private validateTokenUseCase : ValidateTokenUseCase,
    )
   {}

  login(request: LoginRequestDto) {
    return this.loginUseCase.execute(request);
  }

  logout() {
    return this.logoutUseCase.execute();
  }

  register(request: RegisterRequestDto) {
    return this.registerUseCase.execute(request);
  }

  getUserProfile() {
    return this.getUserProfileUseCase.execute();
  }

  validateToken(request : ValidateTokenRequestDto) {
    return this.validateTokenUseCase.execute(request);
  }
}