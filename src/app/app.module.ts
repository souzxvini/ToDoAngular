import { ChangePasswordComponent } from './views/change-logged-user-account/change-password/change-password.component';
import { EditProfileDialogComponent } from './views/dialogs/edit-profile/edit-profile-dialog.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { EmailConfirmComponent } from './views/forgot-password/email-confirm/email-confirm.component';
import { ResetPasswordComponent } from './views/forgot-password/reset-password/reset-password.component';
import {MatDialogModule} from '@angular/material/dialog';
import { MessageComponent } from './components/message/message/message.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';
import { HeaderComponent } from './components/header/header/header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import { MenuOptionsComponent } from './views/home/menu-options/menu-options.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { AuthInterceptor } from './services/token/token-interceptor.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule} from '@angular/material/core';
import { ProgressCompletedComponent } from './views/dialogs/progress-completed/progress-completed.component';
import { EditTaskDialogComponent } from './views/dialogs/edit-task-dialog/edit-task-dialog.component';
import { UserExitDialogComponent } from './views/dialogs/user-exit-dialog/user-exit-dialog.component';
import { FooterComponent } from './components/footer/footer.component';
import { ChangeProfileComponent } from './views/change-logged-user-account/change-profile/change-profile.component';
import { ConfirmLoggedUserComponent } from './views/change-logged-user-account/confirm-logged-user/confirm-logged-user.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    EmailConfirmComponent,
    ResetPasswordComponent,
    MessageComponent,
    HeaderComponent,
    MenuOptionsComponent,
    EditTaskDialogComponent,
    ProgressCompletedComponent,
    UserExitDialogComponent,
    FooterComponent,
    ChangeProfileComponent,
    EditProfileDialogComponent,
    ChangePasswordComponent,
    ConfirmLoggedUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    HttpClientModule,
    MatButtonModule,
    MatDividerModule,
    SweetAlert2Module.forRoot(),
    MatDialogModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatProgressBarModule,
    MatSlideToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
