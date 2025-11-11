import { Injectable } from '@angular/core';
import { UserEntity } from './../../domain/entities/user-entity';
import { AuthResponseDto } from '../../data/models/dtos/auth/auth-response-dto.js';
import { RegisterRequestDto } from '../../data/models/dtos/auth/register-request-dto';
import { LoginRequestDto } from '../../data/models/dtos/auth/login-request-dto';

@Injectable({ providedIn: 'root' })
export class AuthMapper {
  
  // Domain Entity → DTO
  toRegisterRequestDto(request: RegisterRequestDto): RegisterRequestDto {
    return {
      userName: request.userName, 
      email: request.email,
      password: request.password  
    };
  }

  toLoginRequestDto(request: LoginRequestDto): LoginRequestDto {
    return {
      email: request.email,  
      password: request.password 
    };
  }

  // DTO → Domain Entity
  toAuthResponse(dto: AuthResponseDto): AuthResponseDto {
    return {
      token: dto.token,
      email: dto.email
    };
  }

  toUserEntityFromAuth(dto: AuthResponseDto, userName: string): UserEntity {
    return {
      id: '',
      email: dto.email,
      userName: dto.userName || userName
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