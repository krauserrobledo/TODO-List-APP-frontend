import { AuthResponseDto } from '../../data/dtos/auth/auth-response-dto';
import { LoginRequestDto } from '../../data/dtos/auth/login-request-dto';
import { RegisterRequestDto } from '../../data/dtos/auth/register-request-dto';
import { ValidateTokenRequestDto } from '../../data/dtos/auth/validate-token-request-dto';
import { UserModel } from '../models/auth/user-model';

export abstract class AuthRepository {
  abstract login(request: LoginRequestDto): Promise<AuthResponseDto>;
  abstract register(request: RegisterRequestDto): Promise<AuthResponseDto>;
  abstract validateToken(request: ValidateTokenRequestDto): Promise<{ valid: boolean }>;
  abstract getCurrentUser(): UserModel| null;
  abstract logout(): void;
  abstract getToken(): string | null;
}