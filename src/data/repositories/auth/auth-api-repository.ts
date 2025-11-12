import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthRepository } from '../../../domain/repositories/auth-repository';
import { UserModel } from '../../../domain/models/auth/user-model';
import { environment } from '../../../environments/environment';
import { AuthMapper } from '../../mappers/auth-mapper';
import { LoginModel } from '../../../domain/models/auth/login-model';
import { RegisterModel } from '../../../domain/models/auth/register-model';
import { ValidateTokenModel } from '../../../domain/models/auth/validate-token-model';

@Injectable({ providedIn: 'root' })
export class AuthApiRepository implements AuthRepository {

  private http = inject(HttpClient);
  private authMapper = inject(AuthMapper); 
  private baseUrl = `${environment.apiUrl}/auth`;
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'current_user';

  async login(model: LoginModel): Promise<UserModel> {
    // Convertimos el modelo de dominio a DTO
    const dto = this.authMapper.toLoginRequestDto(model);

    // Llamada al backend
    const response = await this.http.post<any>(`${this.baseUrl}/login`, dto).toPromise();
    if (!response) throw new Error('Login failed');
  
    // Convertimos respuesta cruda → DTO → UserModel
    const authResponseDto = this.authMapper.toAuthResponseDto(response);
    const userModel = this.authMapper.toUserModel(authResponseDto);
  
    // Guardamos token y usuario actual
    this.setToken(authResponseDto.token);
    this.setCurrentUser(userModel);
  
    return userModel;
  }
  
  async register(model: RegisterModel): Promise<UserModel> {
    const dto = this.authMapper.toRegisterRequestDto(model);

    const response = await this.http.post<any>(`${this.baseUrl}/register`, dto).toPromise();
    if (!response) throw new Error('Registration failed');
  
    const authResponseDto = this.authMapper.toAuthResponseDto(response);
    const userModel = this.authMapper.toUserModel(authResponseDto);
  
    this.setToken(authResponseDto.token);
    this.setCurrentUser(userModel);
    
    return userModel;
  }

  async validateToken(model: ValidateTokenModel): Promise<{ valid: boolean }> {
    const dto = this.authMapper.toValidateTokenRequestDto(model);

    return await this.http.post<{ valid: boolean }>(`${this.baseUrl}/validate`, dto).toPromise() 
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
