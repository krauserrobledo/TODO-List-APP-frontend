import { Injectable, inject } from '@angular/core';
import { UserModel } from '../../models/auth/user-model';
import { AuthRepository } from '../../repositories/auth-repository';

@Injectable({ providedIn: 'root' })
export class GetUserProfileUseCase {
  private authRepository = inject(AuthRepository);

  execute(): UserModel | null {
    return this.authRepository.getCurrentUser();
  }
}
