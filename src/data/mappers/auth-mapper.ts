import { Injectable } from '@angular/core';
import { UserModel } from '../../domain/models/auth/user-model';
import { AuthResponseDto } from '../dtos/auth/auth-response-dto';
import { RegisterRequestDto } from '../dtos/auth/register-request-dto';
import { LoginRequestDto } from '../dtos/auth/login-request-dto';
import { LoginModel } from '../../domain/models/auth/login-model';
import { RegisterModel } from '../../domain/models/auth/register-model';
import { ValidateTokenModel } from '../../domain/models/auth/validate-token-model';
import { ValidateTokenRequestDto } from '../dtos/auth/validate-token-request-dto';

@Injectable({ providedIn: 'root' })
export class AuthMapper {
  
  // Domain Model → DTO (requests)
  toRegisterRequestDto(model: RegisterModel): RegisterRequestDto {
    return {
      userName: model.userName, 
      email: model.email,
      password: model.password  
    };
  }

  toLoginRequestDto(model: LoginModel): LoginRequestDto {
    return {
      email: model.email,  
      password: model.password 
    };
  }

  toValidateTokenRequestDto(model: ValidateTokenModel): ValidateTokenRequestDto {
    return {
      token: model.token
    };
  }

  // DTO → Domain Entity
  toUserEntity(dto: AuthResponseDto): UserModel {
    return {
      id: '', 
      email: dto.email,
      userName: dto.userName ?? ''
    };
  }

  // API Response → DTO
  toAuthResponseDto(apiResponse: any): AuthResponseDto {
    return {
      token: apiResponse.token || apiResponse.data?.token,
      email: apiResponse.email || apiResponse.data?.email,
      userName: apiResponse.userName || apiResponse.data?.userName
    };
  }
}
