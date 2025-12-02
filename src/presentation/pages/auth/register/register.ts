import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Dialog } from "primeng/dialog";
import { Button } from "primeng/button";
import { Password } from "primeng/password";
import { Store } from '@ngxs/store';
import { AuthState } from '../../../stores/auth/auth.state';
import { Observable, firstValueFrom } from 'rxjs';
import { Register } from '../../../stores/auth/auth.actions';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, Dialog, Button, Password],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private store = inject(Store);
  private router = inject(Router);

  isLoading$: Observable<boolean> = this.store.select(AuthState.isLoading);
  error$: Observable<string | null> = this.store.select(AuthState.error);
  showErrorDialog = false;

  registerForm = this.fb.group({
    userName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  async onSubmit(): Promise<void> {
    if (this.registerForm.invalid) return;

    const request = this.registerForm.value as { userName: string; email: string; password: string };

    try {
      
      await firstValueFrom(this.store.dispatch(new Register(request)));
      this.router.navigate(['/dashboard']);
    } catch (err) {
      console.error('Register Error:', err);
      this.showErrorDialog = true;
    }
  }
}
