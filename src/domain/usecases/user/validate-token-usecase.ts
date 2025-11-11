import { Injectable } from "@angular/core";
import { AuthRepository } from "../../repositories/auth-repository";

@Injectable({ providedIn: 'root' })
export class ValidateTokenUseCase {
  constructor(private authRepository: AuthRepository) {}
  execute(token: string): Promise<{ valid: boolean }> {
    return this.authRepository.validateToken({ token });
  }
}