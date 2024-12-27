import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { FormGroup, FormControl, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatDatepickerModule} from '@angular/material/datepicker';

import { UserService } from '../../shared/services/user.service';
import { Router } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import {provideNativeDateAdapter} from '@angular/material/core';
import { pastDateValidator } from '../../shared/validator/past-date.validator';

@Component({
  selector: 'app-add-friend',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [ReactiveFormsModule, 
            MatButtonModule,
            MatFormFieldModule,
            MatInputModule,
            MatTooltipModule,
            NavbarComponent,
            NavbarComponent,
            MatDatepickerModule],
  templateUrl: './add-friend.component.html',
  styleUrl: './add-friend.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddFriendComponent {
    userService = inject(UserService);
    router = inject(Router);

    successfulInsertion: boolean = false;
    friendAlreadyExists: boolean = false;

    insertedFullname = 'John Doe';

    form = new FormGroup({
            firstname: new FormControl('', Validators.required),
            lastname: new FormControl('', Validators.required),
            nickname: new FormControl(''),
            dateOfBirth: new FormControl('', [Validators.required, pastDateValidator()])
        })

    createValidDateFormat(date: Date) {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${year}-${month}-${day}`;
    }

    onSubmit() {
        console.log("Information obtained directly from the form: ", this.form.value);
        console.log("Date Of Birth: ", this.form.get('dateOfBirth')?.value)
        let date: Date = this.form.get('dateOfBirth')?.value as unknown as Date

        console.log(this.createValidDateFormat(date))

        // const userToInsert: InsertUser = {
        //     username: this.form.get('username')?.value?.trim() || '',
        //     password: this.form.get('password')?.value?.trim() || '',
        //     role: isAdmin ? "ADMIN" : "USER"
        // };
        
        // console.log(userToInsert);
        
        // this.userService.registerUser(userToInsert).subscribe({
        //     next: (response) => {
        //         console.log("Response from backend: ", response)
        //         this.successfulInsertion = true;
        //         this.insertedFullname = userToInsert.username;
        //     },
        //     error: (error) => {
        //         console.log('Error from Backend', error)
        //         const errorResponse = error.error as ErrorResponse;
        //         console.log('Error response', errorResponse);

        //         this.friendAlreadyExists = true;
        //         this.insertedFullname = userToInsert.username;
        //     }
        // });
    }

    goBackToMain() {
        this.form.reset();
        this.router.navigate(['login']);
    }
}
