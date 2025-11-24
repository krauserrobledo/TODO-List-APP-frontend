import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthStore } from '../../../stores/auth-store';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import {PasswordModule } from 'primeng/password';
import {DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, ButtonModule, MessageModule, PasswordModule, DialogModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
  providers:[MessageService]
})

export class LoginComponent {
  private fb = inject(FormBuilder);
  private authStore = inject(AuthStore);
  private router = inject(Router);
  private messageService = inject(MessageService);

  isLoading = this.authStore.isLoading.asReadonly();
  error = this.authStore.error.asReadonly();
  showErrorDialog = false;
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
        this.showErrorDialog = true
      }
    }
  }

  
}
