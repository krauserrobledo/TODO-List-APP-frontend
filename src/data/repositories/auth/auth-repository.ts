// data/repositories/auth-api.repository.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthCredentials, AuthResponse } from '../../../domain/entities/auth-entity';
import { AuthRepository } from '../../../domain/repositories/auth-repository';
import { ApiAuthResponse, mapApiAuthResponse } from '../../models/api-auth-response';
import { ConfigService } from '../../../environments/config-service';

@Injectable({ providedIn: 'root' })
export class AuthApiRepository implements AuthRepository {
  private http = inject(HttpClient);
  private config = inject(ConfigService);

  private get baseUrl(): string {
    return `${this.config.apiUrl}/auth`;
  }

  async login(credentials: AuthCredentials): Promise<AuthResponse> {
    const response = await this.http.post<ApiAuthResponse>(
      `${this.baseUrl}/login`,
      credentials
    ).toPromise();
    
    return mapApiAuthResponse(response!);
  }

  async logout(): Promise<void> {
    await this.http.post(`${this.baseUrl}/logout`, {}).toPromise();
    this.clearTokens();
  }

  async refreshToken(): Promise<AuthResponse> {
    const refreshToken = localStorage.getItem('refreshToken');
    const response = await this.http.post<ApiAuthResponse>(
      `${this.baseUrl}/refresh`,
      { refreshToken }
    ).toPromise();
    
    return mapApiAuthResponse(response!);
  }

  async getCurrentUser(): Promise<any> {
    return await this.http.get<any>(`${this.baseUrl}/me`).toPromise();
  }

  private clearTokens(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  }
}