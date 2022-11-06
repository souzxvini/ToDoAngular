import { ResetPasswordComponent } from './views/forgot-password/reset-password/reset-password.component';
import { EmailConfirmComponent } from './views/forgot-password/email-confirm/email-confirm.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeGuard } from './guards/home.guard';
import { LoginGuard } from './guards/login.guard';
import { RegisterGuard } from './guards/register.guard';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';

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
    canActivate: [RegisterGuard]
  },
  {
    path:'home',
    component: HomeComponent,
    canActivate: [HomeGuard]
  },
  {
    path:'reset-password/:email',
    component: ResetPasswordComponent,
    canActivate: [LoginGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
