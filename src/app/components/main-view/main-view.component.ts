import { Component } from '@angular/core';
import { SimpleTableComponent } from "../simple-table/simple-table.component";
import { NavbarComponent } from '../navbar/navbar.component';
import { ListGroupMenuComponent } from '../list-group-menu/list-group-menu.component';

@Component({
  selector: 'app-main-view',
  standalone: true,
  imports: [SimpleTableComponent, NavbarComponent, ListGroupMenuComponent],
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.css'
})
export class MainViewComponent {

}
