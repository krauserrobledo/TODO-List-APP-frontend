import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthStore } from '../../../stores/auth-store';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.html' ,
  styleUrl: './register.css' 
})

export class RegisterComponent {
  private fb = inject(FormBuilder);
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
        const request = this.registerForm.value as { userName: string; email: string; password: string };
        await this.authStore.register(request);
        this.router.navigate(['/dashboard']);
      } catch (error: any) {
        this.authStore.setError(error.message || 'Error Creating Account');
        console.error(' Error:', error);
        console.error(' Error status:', error.status);
        console.error(' Error message:', error.message);
        console.error(' Error body:', error.error);
      } 
      
      finally {
        
        this.authStore.setLoading(false);
      }
    }
  }
}