import { Injectable, inject } from '@angular/core';
import { AuthRepository } from '../../i-repositories/auth-repository';
import { LoginModel } from '../../models/auth/login-model';
import { UserModel } from '../../models/auth/user-model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoginUseCase {
  private authRepository = inject(AuthRepository);

  execute(model: LoginModel): Observable<UserModel> {
    return this.authRepository.login(model);
  }
}
