import { Injectable } from "@angular/core";
import { AuthRepository } from "../../repositories/auth-repository";
import { ValidateTokenModel } from "../../models/auth/validate-token-model";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class ValidateTokenUseCase {
  constructor(private authRepository: AuthRepository) {}

  execute(model: ValidateTokenModel): Observable<{ valid: boolean }> {
    return this.authRepository.validateToken(model);
  }
}
