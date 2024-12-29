import { ChangeDetectorRef, Component, inject } from '@angular/core';

import { Sort, MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UserService } from '../../../shared/services/user.service';
import { UserResponse } from '../../../shared/interfaces/user-response';

@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [MatSortModule, MatIconModule, RouterLink, NgFor, NgIf, MatTooltipModule],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.css'
})
export class UsersTableComponent{
    router = inject(Router);
    userService = inject(UserService);
    dialog = inject(MatDialog);
    cdr = inject(ChangeDetectorRef);

    users: UserResponse[] = [];
    
    sortedData: UserResponse[] = [];

    ngOnInit(): void {
        this.userService.getAllUsers().subscribe({
            next: (response) => {
                console.log("Response from backend: ", response);
                this.users = response;
                this.sortedData = this.users.slice();
            },
            error: (error) => {
                console.log("Error from backend", error);
            }
        })
    }

    sortData(sort: Sort) {
        const data = this.users.slice();

        if (!sort.active || sort.direction === '') {
            this.sortedData = data;
            return;
        }

        this.sortedData = data.sort((a, b) => {
            const isAsc = sort.direction === 'asc';
            switch (sort.active) {
                case 'id':
                    return compare(Number(a.id), Number(b.id), isAsc)
                case 'username':
                    return compare(a.username, b.username, isAsc);
                case 'role':
                    return compare(a.role, b.role, isAsc);  
                default:
                    return 0;
            }
        });
    }

    onDeleteClicked(id: string):void {
        console.log("Delete clicked for id: ", id);
        
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            data: {entityName: 'user'}
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result === 'confirm') {
              this.deleteUser(id); // Call the API to delete the user
            }
        });
    }

    deleteUser(userId: string): void {
        // Call the backend API to delete the user
        this.userService.deleteUser(userId).subscribe({
            next: (response) => {
                console.log("Deleted user: ", response);
                // Update the frontend list by removing the deleted user
                this.users = this.users.filter(user => user.id !== userId);
                this.sortedData = this.users.slice(); // Ensure the sortedData reflects the change
            },
            error: (error) => {
                console.log("Error trying to delete a user.", error)
            }
        })
    }

    // returns true if the username belongs to the logged in user.
    isLoggedInUser(username: string):boolean {
        return username == this.userService.user()?.username;
    }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
