import { Routes } from '@angular/router';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';

export const routes: Routes = [
    { path:'login', component: UserLoginComponent},
    { path:'', redirectTo: '/login', pathMatch: 'full' },   // localhost:4200 then redirect to /login, path should match 100%
    { path:'register', component: UserRegisterComponent},
];
