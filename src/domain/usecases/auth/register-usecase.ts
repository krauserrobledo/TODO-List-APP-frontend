import { Injectable, inject } from '@angular/core';
import { AuthRepository } from '../../repositories/auth-repository';
import { RegisterRequestDto } from '../../../data/models/dtos/auth/register-request-dto';
import { AuthResponseDto } from '../../../data/models/dtos/auth/auth-response-dto';

@Injectable({ providedIn: 'root' })
export class RegisterUseCase {
  private authRepository = inject(AuthRepository);

  execute(request: RegisterRequestDto): Promise<AuthResponseDto> {
    return this.authRepository.register(request);
  }
}