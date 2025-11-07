import { Observable } from 'rxjs';
import { UserEntity } from '../entities/user-entity';
export abstract class UserRepository {
    abstract login(params: {email: string, password: string}): Observable<UserEntity>
    abstract register(params: {username: string, email: string, password: string}): Observable<UserEntity>;
    abstract getUserProfile(): Observable<UserEntity>;
}