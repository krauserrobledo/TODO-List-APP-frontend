import { Component, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { DividerModule } from 'primeng/divider';
import { ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngxs/store';
import { HydrateUser, Logout } from '../presentation/stores/auth/auth.actions';
import { AuthState } from '../presentation/stores/auth/auth.state';
import { MenuModule } from "primeng/menu";
/**
 * The root component of the application, responsible for rendering the main layout and handling user authentication state.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ButtonModule, ToolbarModule, ReactiveFormsModule, DividerModule, MenuModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  showUserMenu: boolean = false;
  store = inject(Store);
  currentUser$ = this.store.select(AuthState.user);
  private router = inject(Router);

  /// Logout the current user and navigate to the login page
  logout(): void {
    this.store.dispatch(new Logout());
    this.router.navigate(['/login']);
    this.showUserMenu = false;
  }
  /// On component initialization, hydrate the user state
  ngOnInit() {
    this.store.dispatch(new HydrateUser());
  }

  /// Navigate to the registration page
  goRegister() {
    this.router.navigate(['/register']);
  }
  /// Navigate to the login page
  goLogin() {
    this.router.navigate(['/login']);
  }

  /// Listen for clicks outside the user menu to close it
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.user-menu') && !target.closest('.profile-button')) {
      this.showUserMenu = false;
    }
  }
}
