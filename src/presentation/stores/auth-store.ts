import { Injectable, signal, inject } from '@angular/core';
import { UserEntity } from './../../domain/entities/user-entity';
import { AuthApiRepository } from '../../data/repositories/auth/auth-api-repository';

@Injectable({ providedIn: 'root' })
export class AuthStore {
  private authRepository = inject(AuthApiRepository);

  currentUser = signal<UserEntity | null>(null);
  isLoading = signal(false);
  error = signal<string | null>(null);

  setUser(user: UserEntity | null): void {
    this.currentUser.set(user);
  }

  setLoading(loading: boolean): void {
    this.isLoading.set(loading);
  }

  setError(error: string | null): void {
    this.error.set(error);
  }

  logout(): void {
    this.authRepository.logout();
    this.currentUser.set(null);
    this.error.set(null);
  }
}