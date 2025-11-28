import { Injectable, inject } from '@angular/core';
import { UserModel } from '../../models/auth/user-model';
import { AuthRepository } from '../../repositories/auth-repository';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GetUserProfileUseCase {
  private authRepository = inject(AuthRepository);

  execute(): Observable<UserModel | null > {
    return this.authRepository.getCurrentUser();
  }
}
