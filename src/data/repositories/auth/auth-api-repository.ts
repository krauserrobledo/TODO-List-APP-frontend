import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthRepository } from '../../../domain/repositories/auth-repository';

import { UserEntity } from '../../../domain/entities/user-entity';

import { environment } from '../../../environments/environment';
import { AuthMapper } from '../../../base/mappers/auth-mapper';
import { LoginRequestDto } from '../../models/dtos/auth/login-request-dto';
import { RegisterRequestDto } from '../../models/dtos/auth/register-request-dto';
import { AuthResponseDto } from '../../models/dtos/auth/auth-response-dto';
import { ValidateTokenRequestDto } from '../../models/dtos/auth/validate-token-request-dto';

@Injectable({ providedIn: 'root' })
export class AuthApiRepository implements AuthRepository {
  private http = inject(HttpClient);
  
  private authMapper = inject(AuthMapper); 
  private baseUrl = `${environment.apiUrl}/auth`;
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'current_user';

  async login(request: LoginRequestDto): Promise<AuthResponseDto> {

    const loginDto : LoginRequestDto = this.authMapper.toLoginRequestDto(request);

    const response = await this.http.post<any>(`${this.baseUrl}/login`, loginDto).toPromise();
    
    if (!response) {
      throw new Error('Login failed');
    }
    
    const authResponseDto = this.authMapper.toAuthResponseDto(response);
    const authResponse = this.authMapper.toAuthResponse(authResponseDto);
    const userEntity = this.authMapper.toUserEntityFromAuth(authResponseDto, request.email.split('@')[0]);

    this.setToken(authResponse.token);
    this.setCurrentUser(userEntity);
    
    return authResponse;
  }

  async register(request: RegisterRequestDto): Promise<AuthResponseDto> {
    
    const registerDto: RegisterRequestDto = this.authMapper.toRegisterRequestDto(request);
    
    console.log('Register DTO:', registerDto);
    
    const response = await this.http.post<any>(`${this.baseUrl}/register`, registerDto).toPromise();
    
    if (!response) {
      throw new Error('Registration failed');
    }

    // Use Mapper
    const authResponseDto = this.authMapper.toAuthResponseDto(response);
    const authResponse = this.authMapper.toAuthResponse(authResponseDto);
    const userEntity = this.authMapper.toUserEntityFromAuth(authResponseDto, request.userName);

    this.setToken(authResponse.token);
    this.setCurrentUser(userEntity);
    
    return authResponse;
  }

  async validateToken(request: ValidateTokenRequestDto): Promise<{ valid: boolean }> {
    return await this.http.post<{ valid: boolean }>(`${this.baseUrl}/validate`, request).toPromise() 
      ?? { valid: false };
  }

  getCurrentUser(): UserEntity | null {
    const userData = localStorage.getItem(this.USER_KEY);
    return userData ? JSON.parse(userData) : null;
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  private setCurrentUser(user: UserEntity): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }
}