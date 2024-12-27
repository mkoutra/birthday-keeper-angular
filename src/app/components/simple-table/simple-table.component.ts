import { Component, inject } from '@angular/core';
import { FriendResponse, friendsDemo } from '../../shared/interfaces/friend-response';

import { Sort, MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';

import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-simple-table',
  standalone: true,
  imports: [MatSortModule, MatIconModule, RouterLink, NgFor],
  templateUrl: './simple-table.component.html',
  styleUrl: './simple-table.component.css'
})
export class SimpleTableComponent {
    router = inject(Router);
    friends = friendsDemo;
    dialog = inject(MatDialog);

    sortedData: FriendResponse[];

    constructor() {
        this.sortedData = this.friends.slice();
    }

    sortData(sort: Sort) {
        const data = this.friends.slice();

        if (!sort.active || sort.direction === '') {
            this.sortedData = data;
            return;
        }

        this.sortedData = data.sort((a, b) => {
            const isAsc = sort.direction === 'asc';
            switch (sort.active) {
                case 'id':
                    return compare(a.id, b.id, isAsc);
                case 'firstname':
                    return compare(a.firstname, b.firstname, isAsc);
                case 'lastname':
                    return compare(a.lastname, b.lastname, isAsc);
                case 'dateOfBirth':
                    return compare(a.dateOfBirth, b.dateOfBirth, isAsc);
                case 'daysUntilNextBirthday':
                    return compare(a.daysUntilNextBirthday, b.daysUntilNextBirthday, isAsc);
                default:
                    return 0;
            }
        });
    }

    onEditClicked(id:string) {
        this.router.navigate(['/friends/edit', id]);
    }

    onDeleteClicked(id:string):void {
        console.log("Delete clicked for id: ", id);
        const dialogRef = this.dialog.open(ConfirmationDialogComponent);

        dialogRef.afterClosed().subscribe(result => {
            if (result === 'confirm') {
              this.deleteFriend(id); // Call the API to delete the friend
            }
        });
    }

    deleteFriend(friendId: string): void {
        // Call the backend API to delete the friend
        console.log(`Deleting friend with ID: ${friendId} from the backend.`);
      }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
