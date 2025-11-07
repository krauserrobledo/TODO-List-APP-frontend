import { AuthResponse, LoginRequest, RegisterRequest, ValidateTokenRequest } from '../entities/auth-entity';
import { UserEntity } from '../entities/user-entity';

export abstract class AuthRepository {
  abstract login(request: LoginRequest): Promise<AuthResponse>;
  abstract register(request: RegisterRequest): Promise<AuthResponse>;
  abstract validateToken(request: ValidateTokenRequest): Promise<{ valid: boolean }>;
  abstract getCurrentUser(): UserEntity | null;
  abstract logout(): void;
}