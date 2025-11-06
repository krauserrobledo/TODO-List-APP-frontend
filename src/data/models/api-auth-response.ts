// data/models/api-auth-response.model.ts
import { UserEntity } from '../../domain/entities/user-entity';
import { AuthResponse } from './../../domain/entities/auth-entity';

export interface ApiAuthResponse {
  user: {
    id: string;
    email: string;
    username: string;
  };
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

// Mapper
export const mapApiAuthResponse = (response: ApiAuthResponse): AuthResponse => ({
  user: response.user,
  token: response.accessToken,
  refreshToken: response.refreshToken,
  expiresIn: response.expiresIn
});