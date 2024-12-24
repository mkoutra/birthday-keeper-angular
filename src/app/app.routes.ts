import { Routes } from '@angular/router';
import { UserLoginComponent } from './components/user-login/user-login.component';

export const routes: Routes = [
    { path:'login', component: UserLoginComponent},
    { path:'', redirectTo: '/login', pathMatch: 'full' },   // localhost:4200 then redirect to /login, path should match 100%
];
