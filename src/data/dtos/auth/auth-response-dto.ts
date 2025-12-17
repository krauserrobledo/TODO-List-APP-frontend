/**
 * Data Transfer Object representing the response from an authentication request.
 */
export interface AuthResponseDto {
  token: string;
  email: string;
  userName: string;
}
