import { Injectable } from "@angular/core";
import { AuthRepository } from "../../i-repositories/auth-repository";
import { ValidateTokenModel } from "../../models/auth/validate-token-model";
import { Observable } from "rxjs";

/**
 * Use case for validating an authentication token.
 */
@Injectable({ providedIn: 'root' })
export class ValidateTokenUseCase {
  constructor(private authRepository: AuthRepository) {}

  execute(model: ValidateTokenModel): Observable<{ valid: boolean }> {
    return this.authRepository.validateToken(model);
  }
}
