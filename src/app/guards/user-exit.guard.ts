import { UserExitDialogComponent } from './../views/dialogs/user-exit-dialog/user-exit-dialog.component';
import { RegisterComponent } from './../views/register/register.component';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class UserExitGuard implements CanDeactivate<unknown> {

  constructor(private dialog: MatDialog){

  }

  canDeactivate(
    component: RegisterComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(component.form.dirty && !component.myForm.submitted){
        const dialogRef = this.dialog.open(UserExitDialogComponent, {
        width: '500px'
       });
       return dialogRef.afterClosed()
    } else{
      return true;
    }



  }

}
