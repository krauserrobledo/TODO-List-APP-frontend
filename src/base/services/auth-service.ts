import { Injectable } from "@angular/core";
import { LoginUseCase } from "../../domain/usecases/auth/login-usecase";
import { RegisterUseCase } from "../../domain/usecases/auth/register-usecase";
import { LogoutUseCase } from "../../domain/usecases/auth/logout-usecase";
import { ValidateTokenUseCase } from "../../domain/usecases/auth/validate-token-usecase";
import { GetUserProfileUseCase } from "../../domain/usecases/auth/get-user-profile-usecase";
import { LoginModel } from "../../domain/models/auth/login-model";
import { RegisterModel } from "../../domain/models/auth/register-model";
import { ValidateTokenModel } from "../../domain/models/auth/validate-token-model";
import { AuthMapper } from "../../data/mappers/auth-mapper";

@Injectable({ providedIn: 'root' })
export class AuthService {

    constructor(
      private logoutUseCase: LogoutUseCase,
      private loginUseCase: LoginUseCase,
      private registerUseCase: RegisterUseCase,
      private getUserProfileUseCase : GetUserProfileUseCase,
      private validateTokenUseCase : ValidateTokenUseCase,
      private authMapper: AuthMapper  
    ) {}

    login(model: LoginModel) {
      const dto = this.authMapper.toLoginRequestDto(model);
      return this.loginUseCase.execute(dto);
    }

    logout() {
      return this.logoutUseCase.execute();
    }

    register(model: RegisterModel) {
      const dto = this.authMapper.toRegisterRequestDto(model);
      return this.registerUseCase.execute(dto);
    }

    getUserProfile() {
      return this.getUserProfileUseCase.execute();
    }

    validateToken(model: ValidateTokenModel) {
      const dto = this.authMapper.toValidateTokenRequestDto(model);
      return this.validateTokenUseCase.execute(dto);
    }
}
