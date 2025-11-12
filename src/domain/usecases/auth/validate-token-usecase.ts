import { Injectable } from "@angular/core";
import { AuthRepository } from "../../repositories/auth-repository";
import { ValidateTokenRequestDto } from "../../../data/models/dtos/auth/validate-token-request-dto";

@Injectable({ providedIn: 'root' })
export class ValidateTokenUseCase {
  constructor(private authRepository: AuthRepository) {}

  execute(request: ValidateTokenRequestDto): Promise<{ valid: boolean }> {
    return this.authRepository.validateToken(request);
  }
}
