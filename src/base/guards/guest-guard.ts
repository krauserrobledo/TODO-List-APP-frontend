import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthRepository } from '../../domain/repositories/auth-repository';

@Injectable({ providedIn: 'root' })
export class GuestGuard implements CanActivate {
  private authRepository = inject(AuthRepository);
  private router = inject(Router);

  canActivate(): boolean {
    const user = this.authRepository.getCurrentUser();
    const token = (this.authRepository as any).getToken?.();
    
    if (!user || !token) {
      return true;
    }
    
    this.router.navigate(['/']);
    return false;
  }
}