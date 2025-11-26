import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { AuthStore } from '../presentation/stores/auth-store';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ButtonModule, ToolbarModule, ReactiveFormsModule ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  authStore = inject(AuthStore);
  private router = inject(Router);

  logout(): void {
    this.authStore.logout();
    this.router.navigate(['/login']);
  }

  
}