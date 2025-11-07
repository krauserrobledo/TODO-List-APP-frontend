import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginUseCase } from '../../../../domain/usecases/login-use-case';
import { AuthStore } from '../../../stores/auth-store';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private loginUseCase = inject(LoginUseCase);
  private authStore = inject(AuthStore);
  private router = inject(Router);

  isLoading = this.authStore.isLoading.asReadonly();
  error = this.authStore.error.asReadonly();

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  async onSubmit(): Promise<void> {
    if (this.loginForm.valid) {
      this.authStore.setLoading(true);
      this.authStore.setError(null);

      try {
        const request = this.loginForm.value as { email: string; password: string };
        await this.loginUseCase.execute(request);
        this.router.navigate(['/dashboard']);
      } catch (error: any) {
        this.authStore.setError(error.message || 'Error al iniciar sesión');
      } finally {
        this.authStore.setLoading(false);
      }
    }
  }
}