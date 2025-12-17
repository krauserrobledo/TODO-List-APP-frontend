import { Injectable } from "@angular/core";
import { AuthRepository } from "../../i-repositories/auth-repository";
import { Observable } from "rxjs";

/**
 * Use case for logging out a user.
 */
@Injectable({ providedIn: 'root' })
export class LogoutUseCase {
  constructor(private authRepository: AuthRepository) { }
  
  execute(): Observable<void> {
    return this.authRepository.logout();
  }
}
