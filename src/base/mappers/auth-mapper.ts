import { Injectable } from '@angular/core';
import { LoginRequest, RegisterRequest, AuthResponse } from './../../domain/entities/auth-entity';
import { UserEntity } from './../../domain/entities/user-entity';
import { AuthResponseDto } from '../../data/models/dtos/auth/auth-response-dto.js';
import { RegisterRequestDto } from '../../data/models/dtos/auth/register-request-dto';
import { LoginRequestDto } from '../../data/models/dtos/auth/login-request-dto';

@Injectable({ providedIn: 'root' })
export class AuthMapper {
  
  // Domain Entity → DTO
  toRegisterRequestDto(request: RegisterRequest): RegisterRequestDto {
    return {
      UserName: request.userName, 
      Email: request.email,
      Password: request.password  
    };
  }

  toLoginRequestDto(request: LoginRequest): LoginRequestDto {
    return {
      Email: request.email,  
      Password: request.password 
    };
  }

  // DTO → Domain Entity
  toAuthResponse(dto: AuthResponseDto): AuthResponse {
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