import { Injectable, inject } from '@angular/core';
import { LoginRequest, AuthResponse } from '../entities/auth-entity';
import { AuthApiRepository } from '../../data/repositories/auth/auth-api-repository';

@Injectable({ providedIn: 'root' })
export class LoginUseCase {
  private authRepository = inject(AuthApiRepository);

  execute(request: LoginRequest): Promise<AuthResponse> {
    return this.authRepository.login(request);
  }
}