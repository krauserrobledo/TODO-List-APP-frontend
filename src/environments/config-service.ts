import { Injectable, inject } from '@angular/core';
import { environment } from './environment';
/**
 * Service for accessing configuration settings.
 */
@Injectable({ providedIn: 'root' })
export class ConfigService {
  get apiUrl(): string {
    return environment.apiUrl;
  }
  // Indicates if the app is running in production mode
  isProduction(): boolean {
    return environment.production;
  }
}
