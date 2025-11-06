import { Injectable, inject } from '@angular/core';
import { UserEntity } from '../entities/user-entity';
import { AuthRepository } from '../repositories/auth-repository';

@Injectable({ providedIn: 'root' })
export class GetCurrentUserUseCase {
  private authRepository = inject(AuthRepository);

  execute(): Promise<UserEntity> {
    return this.authRepository.getCurrentUser();
  }
}