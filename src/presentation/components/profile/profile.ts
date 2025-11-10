import { Component, inject } from '@angular/core';
import { AuthStore } from '../../stores/auth-store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [],
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


