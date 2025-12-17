import { Injectable, inject } from '@angular/core';
import { AuthRepository } from '../../i-repositories/auth-repository';
import { RegisterModel } from '../../models/auth/register-model';
import { UserModel } from '../../models/auth/user-model';
import { Observable } from 'rxjs';

/**
 * Use case for registering a new user.
 */
@Injectable({ providedIn: 'root' })
export class RegisterUseCase {
  private authRepository = inject(AuthRepository);

  execute(model: RegisterModel): Observable<UserModel> {
    return this.authRepository.register(model);
  }
}
