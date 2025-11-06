import { AuthCredentials, AuthResponse } from '../entities/auth-entity';
import { UserEntity } from '../entities/user-entity';

export abstract class AuthRepository {
  abstract login(credentials: AuthCredentials): Promise<AuthResponse>;
  abstract logout(): Promise<void>;
  abstract refreshToken(): Promise<AuthResponse>;
  abstract getCurrentUser(): Promise<UserEntity>;
}