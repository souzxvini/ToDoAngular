import { UserExitGuard } from './guards/user-exit.guard';
import { ResetPasswordComponent } from './views/forgot-password/reset-password/reset-password.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeGuard } from './guards/home.guard';
import { LoginGuard } from './guards/login.guard';
import { RegisterGuard } from './guards/register.guard';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { ChangeProfileComponent } from './views/change-logged-user-account/change-profile/change-profile.component';
import { UserExitEditProfileGuard } from './guards/user-exit-edit-profile.guard';
import { ChangePasswordComponent } from './views/change-logged-user-account/change-password/change-password.component';
import { ChangePasswordGuard } from './guards/change-password.guard';
import { ErrorComponent } from './views/error/error.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path:'login',
    component: LoginComponent,
    canActivate: [LoginGuard]
  },
  {
    path:'register',
    component: RegisterComponent,
    canActivate: [RegisterGuard],
    canDeactivate: [UserExitGuard]
  },
  {
    path:'home',
    component: HomeComponent,
    canActivate: [HomeGuard]
  },
  {
    path:'reset-password/:email',
    component: ResetPasswordComponent,
    canActivate: [LoginGuard],
    canDeactivate: [UserExitGuard]
  },
  {
    path:'edit-profile/:email',
    component: ChangeProfileComponent,
    canActivate: [HomeGuard],
    canDeactivate: [UserExitEditProfileGuard]
  },
  {
    path:'edit-password/:email',
    component: ChangePasswordComponent,
    canActivate: [ChangePasswordGuard],
    canDeactivate: [UserExitEditProfileGuard]
  },
  {
    path:'**',
    redirectTo: '404'
  },
  {
    path:'404',
    component: ErrorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
