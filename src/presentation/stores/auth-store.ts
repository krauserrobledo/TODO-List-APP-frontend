// presentation/stores/auth.store.ts
import { Injectable, signal, computed, inject } from '@angular/core';
import { UserEntity } from '../../domain/entities/user-entity';
import { AuthResponse } from '../../domain/entities/auth-entity';

@Injectable({ providedIn: 'root' })
export class AuthStore {
  // Estado reactivo
  private userSignal = signal<UserEntity | null>(null);
  private loadingSignal = signal<boolean>(false);
  private errorSignal = signal<string | null>(null);
  private isAuthenticatedSignal = computed(() => !!this.userSignal());

  // Getters públicos
  readonly user = this.userSignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();
  readonly isAuthenticated = this.isAuthenticatedSignal;

  // Actions
  setUser(user: UserEntity | null): void {
    this.userSignal.set(user);
  }

  setLoading(loading: boolean): void {
    this.loadingSignal.set(loading);
  }

  setError(error: string | null): void {
    this.errorSignal.set(error);
  }

  setAuthData(authResponse: AuthResponse): void {
    this.userSignal.set(authResponse.user);
    localStorage.setItem('token', authResponse.token);
    localStorage.setItem('refreshToken', authResponse.refreshToken);
  }

  clearAuth(): void {
    this.userSignal.set(null);
    this.errorSignal.set(null);
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  }
}