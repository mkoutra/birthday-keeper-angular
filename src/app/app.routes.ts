import { Routes } from '@angular/router';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { MainViewComponent } from './components/main-view/main-view.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AddFriendComponent } from './components/add-friend/add-friend.component';
import { UpdateFriendComponent } from './components/update-friend/update-friend.component';
import { UsersMainComponent } from './components/users/users-main/users-main.component';
import { AddUserComponent } from './components/users/add-user/add-user.component';

export const routes: Routes = [
    { path:'login', component: UserLoginComponent},
    { path:'', redirectTo: '/login', pathMatch: 'full' },       // localhost:4200 then redirect to /login, path should match 100%
    { path:'register', component: UserRegisterComponent },
    { path:'main', component: MainViewComponent },
    { path:'friends/add', component: AddFriendComponent },
    { path:'friends/edit/:id', component: UpdateFriendComponent },
    { path: 'users', component: UsersMainComponent },
    { path: 'users/add', component: AddUserComponent },
    { path:'not-found', component: NotFoundComponent },
    { path:'**', redirectTo: '/not-found', pathMatch: 'full' },  // any non matching path should redirect to /not-found
];
