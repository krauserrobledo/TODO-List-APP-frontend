import { Injectable, signal, inject } from '@angular/core';
import { UserEntity } from './../../domain/entities/user-entity';
import { AuthRepository } from '../../domain/repositories/auth-repository';
import { LogoutUseCase } from '../../domain/usecases/user/logout-usecase';
import { RegisterUseCase } from '../../domain/usecases/user/register-use-case';
import { LoginUseCase } from '../../domain/usecases/user/login-use-case';
import { LoginRequestDto } from '../../data/models/dtos/auth/login-request-dto';
import { RegisterRequestDto } from '../../data/models/dtos/auth/register-request-dto';

@Injectable({ providedIn: 'root' })
export class AuthStore {
  private authRepository = inject(AuthRepository);
  private loginUseCase = inject(LoginUseCase);
  private registerUseCase = inject(RegisterUseCase);
  private logoutUseCase = inject(LogoutUseCase);

  currentUser = signal<UserEntity | null>(this.authRepository.getCurrentUser())
  isLoading = signal(false);
  error = signal<string | null>(null);

  async login(credentials: LoginRequestDto): Promise<void> {
    this.setLoading(true);
    this.setError(null);
    
    try {
      const response = await this.loginUseCase.execute(credentials);
      this.currentUser.set(this.authRepository.getCurrentUser());
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
      const response = await this.registerUseCase.execute(userData);
      this.currentUser.set(this.authRepository.getCurrentUser());
    } catch (error: any) {
      this.setError(error.message);
      throw error;
    } finally {
      this.setLoading(false);
    }
  }

  logout(): void {
    this.logoutUseCase.execute();
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