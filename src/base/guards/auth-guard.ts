import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthApiRepository } from '../../data/repositories/auth-api-repository';

/**
 * Guard to protect routes from unauthenticated access.
 */
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  private authRepository = inject(AuthApiRepository);
  private router = inject(Router);

  /// Determine if the route can be activated based on user authentication status
  canActivate(): boolean {
    const user = this.authRepository.getCurrentUser();
    const token = (this.authRepository as any).getToken?.();

    if (user && token) {
      return true;
    }

    this.router.navigate(['/dashboard']);
    return false;
  }
}
