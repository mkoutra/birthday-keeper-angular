import { inject, Injectable, signal, effect } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { LoggedInUser } from '../interfaces/logged-in-user';
import { Router } from '@angular/router';

import { InsertUser } from '../interfaces/insert-user';
import { InsertedUserResponse } from '../interfaces/inserted-user-response';
import { Credentials } from '../interfaces/credentials';
import { LoggedInResponse } from '../interfaces/logged-in-response';

const BACKEND_API_URL = "http://localhost:8080"

@Injectable({
    providedIn: 'root'
})
export class UserService {

    http: HttpClient = inject(HttpClient);

    user = signal<LoggedInUser | null>(null)

    router = inject(Router);

    constructor() { }

    registerUser(user: InsertUser) {
        return this.http.post<InsertedUserResponse>(`${BACKEND_API_URL}/api/register`, user);
    }

    loginUser(credentials: Credentials) {
        return this.http.post<LoggedInResponse>(`${BACKEND_API_URL}/api/auth/authenticate`, credentials);
    }
}
