import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserExitDialogComponent } from '../views/dialogs/user-exit-dialog/user-exit-dialog.component';
import { ResetPasswordComponent } from '../views/forgot-password/reset-password/reset-password.component';

@Injectable({
  providedIn: 'root'
})
export class UserExitForgotPasswordGuard implements CanDeactivate<unknown> {

  constructor(private dialog: MatDialog){}

  canDeactivate(
    component: ResetPasswordComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(component.form.dirty && !component.myForm.submitted){
        const dialogRef = this.dialog.open(UserExitDialogComponent, {
        width: '500px',
        height:'340px'
       });
       return dialogRef.afterClosed()
    } else{
      return true;
    }

  }

}
