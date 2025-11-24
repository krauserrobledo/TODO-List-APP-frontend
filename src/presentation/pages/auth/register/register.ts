import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthStore } from '../../../stores/auth-store';
import { Dialog } from "primeng/dialog";
import { Button } from "primeng/button";


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, Dialog, Button],
  templateUrl: './register.html' ,
  styleUrl: './register.css'
})

export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authStore = inject(AuthStore);
  private router = inject(Router);

  isLoading = this.authStore.isLoading.asReadonly();
  error = this.authStore.error.asReadonly();
  showErrorDialog = false;

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

        const request = this.registerForm.value as { userName: string; email: string; password: string };
        await this.authStore.register(request);

        this.router.navigate(['/dashboard']);

      } catch (error: any) {

        this.authStore.setError(error.message || 'Error Creating Account');
        console.error(' Error:', error);
        let errorMessage = 'Error creating Account';
        this.showErrorDialog = true
        if (error.error) {

          if (error.error.errors && Array.isArray(error.error.errors)) {
            const firstError = error.error.errors[0];

            if (firstError.includes('already taken')) {
              errorMessage = 'User Name already exists';
              this.showErrorDialog = true
              
            } else {
              errorMessage = firstError;
            }
          }

          else if (error.error.error) {
            if (error.error.error.includes('already taken')) {
              errorMessage = 'User Name already exists!';
              this.showErrorDialog = true
            } else {
              errorMessage = error.error.error;
              this.showErrorDialog = true
            }
          }
        }

        this.authStore.setError(errorMessage);
        this.showErrorDialog = true

      } finally {
        this.authStore.setLoading(false);
      }
    }
  }
}
