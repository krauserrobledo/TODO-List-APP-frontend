import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthRepository } from '../../domain/i-repositories/auth-repository';
import { UserModel } from '../../domain/models/auth/user-model';
import { environment } from '../../environments/environment';
import { AuthMapper } from '../mappers/auth-mapper';
import { LoginModel } from '../../domain/models/auth/login-model';
import { RegisterModel } from '../../domain/models/auth/register-model';
import { ValidateTokenModel } from '../../domain/models/auth/validate-token-model';
import { Observable, map, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthApiRepository implements AuthRepository {
  private http = inject(HttpClient);
  private authMapper = inject(AuthMapper);
  private baseUrl = `${environment.apiUrl}/auth`;
  private readonly TOKEN_KEY = 'authToken';
  private readonly USER_KEY = 'current_user';

  login(model: LoginModel): Observable<UserModel> {
    const dto = this.authMapper.toLoginRequestDto(model);
    return this.http.post<any>(`${this.baseUrl}/login`, dto).pipe(
      map(apiRes => this.authMapper.toAuthResponseDto(apiRes)),
      tap(authRes => this.setToken(authRes.token)),
      map(authRes => this.authMapper.toUserModel(authRes)),
      tap(user => this.setCurrentUser(user))
    );
  }

  register(model: RegisterModel): Observable<UserModel> {
    const dto = this.authMapper.toRegisterRequestDto(model);
    return this.http.post<any>(`${this.baseUrl}/register`, dto).pipe(
      map(apiRes => this.authMapper.toAuthResponseDto(apiRes)),
      tap(authRes => this.setToken(authRes.token)),
      map(authRes => this.authMapper.toUserModel(authRes)),
      tap(user => this.setCurrentUser(user))
    );
  }

  validateToken(model: ValidateTokenModel): Observable<{ valid: boolean }> {
    const dto = this.authMapper.toValidateTokenRequestDto(model);
    return this.http.post<{ valid: boolean }>(`${this.baseUrl}/validate`, dto);
  }

  getCurrentUser(): Observable<UserModel | null> {
  const userData = localStorage.getItem(this.USER_KEY);
  const user: UserModel | null = userData ? JSON.parse(userData) : null;
  return of(user);
}

  logout(): Observable <void> {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    return of();
  }

  getToken(): Observable<string | null> {
    const token = localStorage.getItem(this.TOKEN_KEY);
    return of (token);
  }

  private setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  private setCurrentUser(user: UserModel): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }
}
