import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
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
      try {
        const request = this.loginForm.value as { email: string; password: string };
        await this.authStore.login(request);
        this.router.navigate(['/dashboard']);
      } catch (error: any) {
        console.error('Login Error:', error);
      }
    }
  }
}
