
import { AuthResponseDto } from '../../data/models/dtos/auth/auth-response-dto';
import { LoginRequestDto } from '../../data/models/dtos/auth/login-request-dto';
import { RegisterRequestDto } from '../../data/models/dtos/auth/register-request-dto';
import { ValidateTokenRequestDto } from '../../data/models/dtos/auth/validate-token-request-dto';
import { UserEntity } from '../entities/user-entity';

export abstract class AuthRepository {
  abstract login(request: LoginRequestDto): Promise<AuthResponseDto>;
  abstract register(request: RegisterRequestDto): Promise<AuthResponseDto>;
  abstract validateToken(request: ValidateTokenRequestDto): Promise<{ valid: boolean }>;
  abstract getCurrentUser(): UserEntity | null;
  abstract logout(): void;
  abstract getToken(): string | null;
}