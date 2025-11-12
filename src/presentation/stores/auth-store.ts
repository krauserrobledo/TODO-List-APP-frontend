import { Injectable, signal, inject } from '@angular/core';
import { UserModel } from '../../domain/models/auth/user-model';
import { AuthService } from '../../base/services/auth-service';
import { RegisterModel } from '../../domain/models/auth/register-model';
import { LoginModel } from '../../domain/models/auth/login-model';
import { ValidateTokenModel } from '../../domain/models/auth/validate-token-model';

@Injectable({ providedIn: 'root' })
export class AuthStore {
  private authService =inject(AuthService);

  currentUser = signal<UserModel | null>(this.authService.getUserProfile());
  isLoading = signal(false);
  error = signal<string | null>(null);

  async login(credentials: LoginModel): Promise<void> {
    this.setLoading(true);
    this.setError(null);
    
    try {
      const response = await this.authService.login(credentials);
      this.currentUser.set(this.authService.getUserProfile());
    } catch (error: any) {
      this.setError(error.message);
      throw error;
    } finally {
      this.setLoading(false);
    }
  }

  async register(userData: RegisterModel): Promise<void> {
    this.setLoading(true);
    this.setError(null);
    
    try {
      const response = await this.authService.register(userData);
      this.currentUser.set(this.authService.getUserProfile());
    } catch (error: any) {
      this.setError(error.message);
      throw error;
    } finally {
      this.setLoading(false);
    }
  }

  async validateToken(token: string): Promise<void> {
    this.setLoading(true);
    try {
      const result = await this.authService.validateToken({ token } as ValidateTokenModel);
      if (!result.valid) {
        this.logout();
      }
    } finally {
      this.setLoading(false);
    }
  }

  logout(): void {
    this.authService.logout();
    this.currentUser.set(null);
    this.error.set(null);
  }

  setUser(user: UserModel | null): void {
    this.currentUser.set(user);
  }

  setLoading(loading: boolean): void {
    this.isLoading.set(loading);
  }

  setError(error: string | null): void {
    this.error.set(error);
  }
}