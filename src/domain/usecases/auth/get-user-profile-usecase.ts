import { Injectable, inject } from '@angular/core';
import { UserModel } from '../../models/auth/user-model';
import { AuthRepository } from '../../i-repositories/auth-repository';
import { Observable } from 'rxjs';

/**
 * Use case for retrieving the current user's profile.
 */
@Injectable({ providedIn: 'root' })
export class GetUserProfileUseCase {
  private authRepository = inject(AuthRepository);

  execute(): Observable<UserModel | null > {
    return this.authRepository.getCurrentUser();
  }
}
