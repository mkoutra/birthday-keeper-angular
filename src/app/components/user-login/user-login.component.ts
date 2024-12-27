import { Component, inject } from '@angular/core';

import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { Credentials } from '../../shared/interfaces/credentials';
import { UserService } from '../../shared/services/user.service';

import { jwtDecode } from 'jwt-decode'
import { TokenClaims } from '../../shared/interfaces/token-claims';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, RouterLink],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent {
    router = inject(Router);
    userService = inject(UserService);

    invalidLogin: boolean = false;

    form = new FormGroup({
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required)
    });

    onSubmit() {
        const userCredentials = this.form.value as Credentials
        console.log("Credentials directly from the form: ", userCredentials)

        this.userService.loginUser(userCredentials).subscribe({
            next: (response) => {
                console.log("Response from backend: ", response)

                // Retrieve token from the response dto
                const token = response.jwtToken;
                console.log("Token: ", token);
                
                // save token to browser's local storage 
                localStorage.setItem("birthday_keeper_token", token);

                const decodedToken = jwtDecode(token) as TokenClaims;
                console.log(decodedToken);

                // Assigns value to user's signal variable
                this.userService.user.set({
                    username: decodedToken.sub,
                    role: decodedToken.role
                })

                this.router.navigate(['main'])
            },
            error: (error) => {
                console.log('Error from Backend', error)
                this.invalidLogin = true;
            }
        })
    }
}
