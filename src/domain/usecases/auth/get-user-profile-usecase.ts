import { Injectable, inject } from '@angular/core';
import { UserModel } from '../../models/auth/user-model';
import { AuthApiRepository } from '../../../data/repositories/auth/auth-api-repository';

@Injectable({ providedIn: 'root' })
export class GetUserProfileUseCase {
  private authRepository = inject(AuthApiRepository);

  execute(): UserModel | null {
    return this.authRepository.getCurrentUser();
  }
}