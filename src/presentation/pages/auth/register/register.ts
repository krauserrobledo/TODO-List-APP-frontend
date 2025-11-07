import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { RegisterUseCase } from '../../../../domain/usecases/register-use-case';
import { AuthStore } from '../../../stores/auth-store';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.html' ,
  styleUrl: './register.css',
  
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private registerUseCase = inject(RegisterUseCase);
  private authStore = inject(AuthStore);
  private router = inject(Router);

  isLoading = this.authStore.isLoading.asReadonly();
  error = this.authStore.error.asReadonly();

  registerForm = this.fb.group({
    userName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  async onSubmit(): Promise<void> {
    if (this.registerForm.valid) {
      this.authStore.setLoading(true);
      this.authStore.setError(null);

      try {
        const request = this.registerForm.value as { username: string; email: string; password: string };
        await this.registerUseCase.execute(request);
        this.router.navigate(['/dashboard']);
      } catch (error: any) {
        this.authStore.setError(error.message || 'Error al crear la cuenta');
      } finally {
        this.authStore.setLoading(false);
      }
    }
  }
}