import { Routes } from '@angular/router';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { MainViewComponent } from './components/main-view/main-view.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AddFriendComponent } from './components/add-friend/add-friend.component';
import { UpdateFriendComponent } from './components/update-friend/update-friend.component';

export const routes: Routes = [
    { path:'login', component: UserLoginComponent},
    { path:'', redirectTo: '/login', pathMatch: 'full' },   // localhost:4200 then redirect to /login, path should match 100%
    { path:'register', component: UserRegisterComponent},
    { path:'main', component: MainViewComponent},
    { path:'friends/add', component: AddFriendComponent},
    { path:'friends/edit/:id', component: UpdateFriendComponent},
    { path:'**', component: NotFoundComponent},             // a no matching path
];
