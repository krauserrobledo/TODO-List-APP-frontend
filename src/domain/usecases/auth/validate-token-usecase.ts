import { Injectable } from "@angular/core";
import { AuthRepository } from "../../repositories/auth-repository";
import { ValidateTokenModel } from "../../models/auth/validate-token-model";

@Injectable({ providedIn: 'root' })
export class ValidateTokenUseCase {
  constructor(private authRepository: AuthRepository) {}

  execute(model: ValidateTokenModel): Promise<{ valid: boolean }> {
    return this.authRepository.validateToken(model);
  }
}
