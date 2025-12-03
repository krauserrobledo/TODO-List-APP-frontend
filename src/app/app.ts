import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngxs/store';
import { HydrateUser, Logout } from '../presentation/stores/auth/auth.actions';
import { AuthState } from '../presentation/stores/auth/auth.state';
import { AuthService } from '../presentation/pages/auth/service/auth-service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ButtonModule, ToolbarModule, ReactiveFormsModule ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {  
  constructor(private authService: AuthService) {}
  store = inject(Store);
  currentUser$ = this.store.select(AuthState.user);
  private router = inject(Router);

  logout(): void {
    this.store.dispatch( new Logout());
    this.router.navigate(['/login']);
  }

  ngOnInit() {
    this.store.dispatch(new HydrateUser());
  }

  
}