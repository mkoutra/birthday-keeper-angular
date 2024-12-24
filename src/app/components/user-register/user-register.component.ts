import { Component } from '@angular/core';

import { FormGroup, FormControl, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { NgIf } from '@angular/common';

@Component({
  selector: 'app-user-register',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatTooltipModule, NgIf, MatCheckboxModule],
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.css'
})
export class UserRegisterComponent {
    passwordRegex: RegExp = /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[!@#$%&.+*]).{8,}$/;

    passwordRequirementsVisible: boolean = false;

    form = new FormGroup({
            username: new FormControl('', Validators.required),
            password: new FormControl('', [Validators.required, Validators.pattern(this.passwordRegex)]),
            confirmPassword: new FormControl('', [Validators.required, Validators.minLength(5)]),
            isAdmin: new FormControl(false)
        },
        this.passwordConfirmPasswordValidator
    )
    
    passwordConfirmPasswordValidator(control: AbstractControl):{ [key:string]: boolean} | null {
        const form = control as FormGroup;
        const password = form.get('password')?.value;
        const confirmPassword = form.get('confirmPassword')?.value;

        if (password && confirmPassword && (password != confirmPassword)) {
            form.get('confirmPassword')?.setErrors({passwordMismatch: true});
            return {passwordMismatch: true}
        }

        return null
    }

    showPassRequirements(display: boolean) {
        this.passwordRequirementsVisible = display;
    }

    onSubmit() {
        console.log(this.form.value)
    }
}
