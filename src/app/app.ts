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

  logout(): void {
    this.store.dispatch( new Logout());
    this.router.navigate(['/login']);
    this.showUserMenu= false;
  }

  ngOnInit() {
    this.store.dispatch(new HydrateUser());
  
  }

  goRegister() {
    this.router.navigate(['/register']);
  }

  goLogin() {
    this.router.navigate(['/login']);
  }
  
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.user-menu') && !target.closest('.profile-button')) {
      this.showUserMenu = false;
    }
  }
}