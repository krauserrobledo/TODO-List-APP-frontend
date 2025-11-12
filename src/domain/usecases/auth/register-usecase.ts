import { Injectable, inject } from '@angular/core';
import { AuthRepository } from '../../repositories/auth-repository';
import { RegisterModel } from '../../models/auth/register-model';
import { UserModel } from '../../models/auth/user-model';

@Injectable({ providedIn: 'root' })
export class RegisterUseCase {
  private authRepository = inject(AuthRepository);

  execute(model: RegisterModel): Promise<UserModel> {
    return this.authRepository.register(model);
  }
}
