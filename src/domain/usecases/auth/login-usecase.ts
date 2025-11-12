import { Injectable, inject } from '@angular/core';
import { AuthRepository } from '../../repositories/auth-repository';
import { LoginModel } from '../../models/auth/login-model';
import { UserModel } from '../../models/auth/user-model';

@Injectable({ providedIn: 'root' })
export class LoginUseCase {
  private authRepository = inject(AuthRepository);

  execute(model: LoginModel): Promise<UserModel> {
    return this.authRepository.login(model);
  }
}
