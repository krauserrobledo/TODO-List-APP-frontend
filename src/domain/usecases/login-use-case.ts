import { Injectable, inject } from '@angular/core';
import { AuthRepository } from '../repositories/auth-repository';
import { LoginRequest, AuthResponse } from '../entities/auth-entity';

@Injectable({ providedIn: 'root' })
export class LoginUseCase {
  private authRepository = inject(AuthRepository);

  execute(request: LoginRequest): Promise<AuthResponse> {
    return this.authRepository.login(request);
  }
}