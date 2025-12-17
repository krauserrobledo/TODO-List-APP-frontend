import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Login, Register, Logout, ValidateToken, GetUserProfile, HydrateUser } from './auth.actions';
import { AuthService } from '../../pages/auth/service/auth-service';
import { AuthStateModel } from '../../../domain/models/auth/auth-state-model';

/**
 * AuthState manages the authentication state of the application.
 * It handles actions related to user login, registration, logout,
 * token validation, and user profile retrieval.
 * It uses AuthService to perform the necessary operations
 * and updates the state accordingly.
 */
@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    token: ""
  }
})

@Injectable()
export class AuthState {

  constructor(private authService: AuthService) { }

  //Selectors

  @Selector()
  static isLoading(state: AuthStateModel): boolean {
    return state.isLoading;
  }

  @Selector()
  static error(state: AuthStateModel): string | null {
    return state.error;
  }

  @Selector()
  static user(state: AuthStateModel) {
    return state.user;
  }

  @Selector()
  static isAuthenticated(state: AuthStateModel) {
    return state.isAuthenticated;
  }

  //Actions

  /** Login action handler */
  @Action(Login)
  login(ctx: StateContext<AuthStateModel>, action: Login) {
    ctx.patchState({ isLoading: true });
    return this.authService.login(action.payload).pipe(
      tap(user => ctx.patchState({ user, isAuthenticated: true, isLoading: false }))
    );
  }

  /** Register action handler */
  @Action(Register)
  register(ctx: StateContext<AuthStateModel>, action: Register) {
    ctx.patchState({ isLoading: true });
    return this.authService.register(action.payload).pipe(
      tap(user => ctx.patchState({ user, isAuthenticated: true, isLoading: false }))
    );
  }

  /** Logout action handler */
  @Action(Logout)
  logout(ctx: StateContext<AuthStateModel>) {
    ctx.patchState({ user: null, isAuthenticated: false });
    return this.authService.logout();
  }

  /** GetUserProfile action handler */
  @Action(GetUserProfile)
  getUserProfile(ctx: StateContext<AuthStateModel>) {
    return this.authService.getUserProfile().pipe(
      tap(user => ctx.patchState({ user, isAuthenticated: !!user }))
    );
  }

  /** ValidateToken action handler */
  @Action(ValidateToken)
  validateToken(ctx: StateContext<AuthStateModel>, action: ValidateToken) {
    return this.authService.validateToken(action.payload).pipe(
      tap(res => {
        if (!res.valid) {
          ctx.patchState({ user: null, isAuthenticated: false });
        }
      })
    );
  }

  /** HydrateUser action handler */
  @Action(HydrateUser)
  hydrate(ctx: StateContext<AuthStateModel>) {
    const userData = localStorage.getItem('current_user');
    const token = localStorage.getItem('authToken');
    if (userData && token) {
      ctx.patchState({
        user: JSON.parse(userData),
        token
      });
    }
  }
}
