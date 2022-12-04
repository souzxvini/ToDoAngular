import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ChangeProfileComponent } from '../views/change-logged-user-account/change-profile/change-profile.component';
import { UserExitDialogComponent } from '../views/dialogs/user-exit-dialog/user-exit-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class UserExitEditProfileGuard implements CanDeactivate<unknown> {

  constructor(private dialog: MatDialog){}

  canDeactivate(
    component: ChangeProfileComponent,
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
