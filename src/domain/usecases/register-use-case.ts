import { Injectable, inject } from '@angular/core';
import { AuthRepository } from '../repositories/auth-repository';
import { RegisterRequest, AuthResponse } from '../entities/auth-entity';

@Injectable({ providedIn: 'root' })
export class RegisterUseCase {
  private authRepository = inject(AuthRepository);

  execute(request: RegisterRequest): Promise<AuthResponse> {
    return this.authRepository.register(request);
  }
}