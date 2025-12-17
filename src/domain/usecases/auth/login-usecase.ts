import { Injectable, inject } from '@angular/core';
import { AuthRepository } from '../../i-repositories/auth-repository';
import { LoginModel } from '../../models/auth/login-model';
import { UserModel } from '../../models/auth/user-model';
import { Observable } from 'rxjs';
/**
 * Use case for logging in a user.
 */
@Injectable({ providedIn: 'root' })
export class LoginUseCase {
  private authRepository = inject(AuthRepository);

  execute(model: LoginModel): Observable<UserModel> {
    return this.authRepository.login(model);
  }
}
