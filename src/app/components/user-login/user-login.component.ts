import { Component, inject } from '@angular/core';

import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

// Material
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { Credentials } from '../../shared/interfaces/credentials';
import { LoggedInResponse } from '../../shared/interfaces/logged-in-response';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, RouterLink],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent {

    userService = inject(UserService)

    invalidLogin: boolean = false;

    form = new FormGroup({
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required)
    })

    onSubmit() {
        const userCredentials = this.form.value as Credentials
        console.log("Credentials directly from the form: ", userCredentials)

        this.userService.loginUser(userCredentials).subscribe({
            next: (response) => {
                console.log("Response from backend: ", response)
            },
            error: (error) => {
                console.log('Error from Backend', error)
                this.invalidLogin = true;
            }
        })
    }
}
