import { AuthStore } from '../../stores/auth-store';
import { Router } from '@angular/router';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {

authStore = inject(AuthStore);
private router = inject(Router);

logout(): void {
  this.authStore.logout();
  this.router.navigate(['/login']);
}
}


