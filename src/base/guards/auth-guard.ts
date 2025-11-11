import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthRepository } from './../../domain/repositories/auth-repository';
import { AuthApiRepository } from '../../data/repositories/auth/auth-api-repository';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  private authRepository = inject(AuthApiRepository);
  private router = inject(Router);

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
