import { Injectable, inject } from '@angular/core';
import { AuthRepository } from '../../repositories/auth-repository';
import { LoginRequestDto } from '../../../data/dtos/auth/login-request-dto';
import { AuthResponseDto } from '../../../data/dtos/auth/auth-response-dto';

@Injectable({ providedIn: 'root' })
export class LoginUseCase {
  private authRepository = inject(AuthRepository);

  execute(request: LoginRequestDto): Promise<AuthResponseDto> {
    return this.authRepository.login(request);
  }
}