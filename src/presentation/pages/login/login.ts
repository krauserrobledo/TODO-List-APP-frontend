// presentation/pages/login/login.component.ts
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUseCase } from './../../../domain/usecases/login-use-case';
import { AuthStore } from './../../stores/auth-store';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class Login {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private loginUseCase = inject(LoginUseCase);
  authStore = inject(AuthStore);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  showEmailError = signal(false);
  showPasswordError = signal(false);

  async onSubmit() {
    if (this.loginForm.valid) {
      this.authStore.setLoading(true);
      this.authStore.setError(null);

      try {
        const credentials = this.loginForm.value as any;
        const authResponse = await this.loginUseCase.execute(credentials);
        
        this.authStore.setAuthData(authResponse);
        this.router.navigate(['/dashboard']);
      } catch (error: any) {
        this.authStore.setError(error.message || 'Error al iniciar sesión');
      } finally {
        this.authStore.setLoading(false);
      }
    } else {
      this.showEmailError.set(this.loginForm.get('email')?.invalid ?? false);
      this.showPasswordError.set(this.loginForm.get('password')?.invalid ?? false);
    }
  }
}