import { inject, Injectable, signal, effect } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { LoggedInUser } from '../interfaces/logged-in-user';
import { Router } from '@angular/router';

import { InsertUser } from '../interfaces/insert-user';
import { Credentials } from '../interfaces/credentials';
import { LoggedInResponse } from '../interfaces/logged-in-response';
import { jwtDecode } from 'jwt-decode';
import { TokenClaims } from '../interfaces/token-claims';
import { UserResponse } from '../interfaces/user-response';

const BACKEND_API_URL = "http://localhost:8080"

@Injectable({
    providedIn: 'root'
})
export class UserService {

    http: HttpClient = inject(HttpClient);

    user = signal<LoggedInUser | null>(null)

    router = inject(Router);

    constructor() { 
        // Try to read token from browser's local storage
        const token = localStorage.getItem("birthday_keeper_token");

        if (token) {
          const decodedToken = jwtDecode(token) as unknown as TokenClaims;
    
          this.user.set({
            username: decodedToken.sub,
            role: decodedToken.role
          });
        }
    
        effect(()=> {
          if (this.user()) {
            // If there are changes in user variable
            console.log("User logged in: ", this.user()?.username);
          } else {
            // If there are no changes in user variable.
            console.log("No user logged in.");
          }
        });
    }

    registerUser(user: InsertUser) {
        return this.http.post<UserResponse>(`${BACKEND_API_URL}/api/register`, user);
    }

    getAllUsers() {
      return this.http.get<UserResponse[]>(`${BACKEND_API_URL}/api/admin/users`);
    }

    getPaginatedUsers(pageNumber: number, pageSize: number) {
      return this.http.get(`${BACKEND_API_URL}/api/admin/paginated?pageNo=${pageNumber}&size=${pageSize}`);
    }

    deleteUser(userId: string) {
      return this.http.delete<UserResponse>(`${BACKEND_API_URL}/api/admin/users/${userId}`);
    }

    loginUser(credentials: Credentials) {
        return this.http.post<LoggedInResponse>(`${BACKEND_API_URL}/api/auth/authenticate`, credentials);
    }

    logoutUser() {
        this.user.set(null);
        localStorage.removeItem('birthday_keeper_token');
        return this.http.post<{code: string, description: string}>(`${BACKEND_API_URL}/api/logout`, null);
    }
}
