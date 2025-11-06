import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../../models/user-entity';
import { UserImplementationRepositoryMapper } from './user-repository-mapper';
import { UserRepository } from '../../../domain/repositories/user-repository';
import { UserEntity } from '../../../domain/entities/user-entity';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class UserRepositoryImplementation extends UserRepository {
    userMapper = new UserImplementationRepositoryMapper();

    constructor(private http: HttpClient) {
        super();
    }

    login(params: {email: string, password: string}): Observable<UserEntity> {
        return this.http
            .post<UserModel>('https://example.com/login', {params})
            .pipe(map(this.userMapper.mapFrom));
    }
    register(params: {userName: string, email: string, password: string}): Observable<UserEntity> {
       return this.http
            .post<UserModel>('https://example.com/register', {params})
            .pipe(map(this.userMapper.mapFrom));
    }
    getUserProfile(): Observable<UserEntity>{
        return this.http.get<UserModel>('https://example.com/user').pipe(
            map(this.userMapper.mapFrom));
    }
}