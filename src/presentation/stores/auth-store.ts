import { Injectable, signal, inject } from '@angular/core';
import { UserEntity } from './../../domain/entities/user-entity';
import { LoginRequestDto } from '../../data/models/dtos/auth/login-request-dto';
import { RegisterRequestDto } from '../../data/models/dtos/auth/register-request-dto';
import { AuthService } from '../../base/services/auth-service';

@Injectable({ providedIn: 'root' })
export class AuthStore {
  private authService =inject(AuthService);

  currentUser = signal<UserEntity | null>(this.authService.getUserProfile());
  isLoading = signal(false);
  error = signal<string | null>(null);

  async login(credentials: LoginRequestDto): Promise<void> {
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

  async register(userData: RegisterRequestDto): Promise<void> {
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
      const result = await this.authService.validateToken({ token });
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

  setUser(user: UserEntity | null): void {
    this.currentUser.set(user);
  }

  setLoading(loading: boolean): void {
    this.isLoading.set(loading);
  }

  setError(error: string | null): void {
    this.error.set(error);
  }
}