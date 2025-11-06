import { Injectable, inject } from '@angular/core';
import { AuthCredentials, AuthResponse } from '../entities/auth-entity';
import { AuthRepository } from '../repositories/auth-repository';

@Injectable({ providedIn: 'root' })
export class LoginUseCase {
  private authRepository = inject(AuthRepository);

  execute(credentials: AuthCredentials): Promise<AuthResponse> {
    return this.authRepository.login(credentials);
  }
}