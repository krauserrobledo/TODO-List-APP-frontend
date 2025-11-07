import { Injectable, inject } from '@angular/core';
import { UserEntity } from '../entities/user-entity';
import { AuthApiRepository } from '../../data/repositories/auth/auth-api-repository';

@Injectable({ providedIn: 'root' })
export class GetCurrentUserUseCase {
  private authRepository = inject(AuthApiRepository);

  execute(): UserEntity | null {
    return this.authRepository.getCurrentUser();
  }
}