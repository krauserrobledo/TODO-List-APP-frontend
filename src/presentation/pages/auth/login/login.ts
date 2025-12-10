import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable, firstValueFrom } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { PasswordModule } from 'primeng/password';
import { DialogModule } from 'primeng/dialog';

import { AuthState } from '../../../stores/auth/auth.state';
import { Login } from '../../../stores/auth/auth.actions';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, MessageModule, PasswordModule, DialogModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
  providers: [MessageService]
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private store = inject(Store);
  private router = inject(Router);

 
  isLoading$: Observable<boolean> = this.store.select(AuthState.isLoading);
  error$: Observable<string | null> = this.store.select(AuthState.error);

  showErrorDialog = false;

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  async onSubmit(): Promise<void> {
    if (this.loginForm.invalid) return;

    const request = this.loginForm.value as { email: string; password: string };

    try {
      await firstValueFrom(this.store.dispatch(new Login(request)));
      this.router.navigate(['/dashboard']);
    } catch (err) {
      console.error('Login Error:', err);
      this.showErrorDialog = true;
    }
  }
}
