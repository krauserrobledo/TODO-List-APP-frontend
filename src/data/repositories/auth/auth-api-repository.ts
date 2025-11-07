// data/repositories/auth-api.repository.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthRepository } from '../../../domain/repositories/auth-repository';
import { LoginRequest, RegisterRequest, ValidateTokenRequest, AuthResponse } from '../../../domain/entities/auth-entity';

import { UserEntity } from '../../../domain/entities/user-entity';

import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthApiRepository implements AuthRepository {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/auth`;
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'current_user';

  async login(request: LoginRequest): Promise<AuthResponse> {
    const response = await this.http.post<AuthResponse>(`${this.baseUrl}/login`, request).toPromise();
    
    if (!response) {
      throw new Error('Login failed');
    }

    this.setToken(response.token);
    this.setCurrentUser({ email: response.email, id: '', username: response.email });
    
    return response;
  }

  async register(request: RegisterRequest): Promise<AuthResponse> {
    const response = await this.http.post<AuthResponse>(`${this.baseUrl}/register`, request).toPromise();
    
    if (!response) {
      throw new Error('Registration failed');
    }

    this.setToken(response.token);
    this.setCurrentUser({ email: response.email, id: '', username: request.username });
    
    return response;
  }

  async validateToken(request: ValidateTokenRequest): Promise<{ valid: boolean }> {
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