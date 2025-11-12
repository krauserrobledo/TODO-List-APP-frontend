import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthRepository } from '../../../domain/repositories/auth-repository';
import { UserModel } from '../../../domain/models/auth/user-model';
import { environment } from '../../../environments/environment';
import { AuthMapper } from '../../mappers/auth-mapper';
import { LoginRequestDto } from '../../dtos/auth/login-request-dto';
import { RegisterRequestDto } from '../../dtos/auth/register-request-dto';
import { AuthResponseDto } from '../../dtos/auth/auth-response-dto';
import { ValidateTokenRequestDto } from '../../dtos/auth/validate-token-request-dto';

@Injectable({ providedIn: 'root' })
export class AuthApiRepository implements AuthRepository {
  private http = inject(HttpClient);
  
  private authMapper = inject(AuthMapper); 
  private baseUrl = `${environment.apiUrl}/auth`;
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'current_user';

  async login(request: LoginRequestDto): Promise<AuthResponseDto> {
    const response = await this.http.post<any>(`${this.baseUrl}/login`, request).toPromise();
    
    if (!response) {
      throw new Error('Login failed');
    }
    
    const authResponseDto = this.authMapper.toAuthResponseDto(response);
    const userEntity = this.authMapper.toUserEntity(authResponseDto);
  
    this.setToken(authResponseDto.token);
    this.setCurrentUser(userEntity);
    
    return authResponseDto;
  }
  
  async register(request: RegisterRequestDto): Promise<AuthResponseDto> {
    const response = await this.http.post<any>(`${this.baseUrl}/register`, request).toPromise();
    
    if (!response) {
      throw new Error('Registration failed');
    }
  
    const authResponseDto = this.authMapper.toAuthResponseDto(response);
    const userEntity = this.authMapper.toUserEntity(authResponseDto);
  
    this.setToken(authResponseDto.token);
    this.setCurrentUser(userEntity);
    
    return authResponseDto;
  }

  async validateToken(request: ValidateTokenRequestDto): Promise<{ valid: boolean }> {
    return await this.http.post<{ valid: boolean }>(`${this.baseUrl}/validate`, request).toPromise() 
      ?? { valid: false };
  }

  getCurrentUser(): UserModel | null {
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

  private setCurrentUser(user: UserModel): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }
}