import { Injectable } from "@angular/core";
import { AuthRepository } from "../repositories/auth-repository";

@Injectable({ providedIn: 'root' })
export class LogoutUseCase {
  constructor(private authRepository: AuthRepository) {}
  execute(): void {
    this.authRepository.logout();
  }
}