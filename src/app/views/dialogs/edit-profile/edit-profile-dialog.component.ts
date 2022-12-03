import { ConfirmLoggedUserComponent } from './../../change-logged-user-account/confirm-logged-user/confirm-logged-user.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-exit-dialog',
  templateUrl: './edit-profile-dialog.component.html',
  styleUrls: ['./edit-profile-dialog.component.css']
})
export class EditProfileDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EditProfileDialogComponent>,
    private dialog: MatDialog
    ) { dialogRef.disableClose = true}

  ngOnInit(): void {

  }

  close(){
    this.dialogRef.close()
  }

  confirmLoginNameEmail(){
    this.dialogRef.close()
    const dialogRef = this.dialog.open(ConfirmLoggedUserComponent, {
      width: '600px'
     });
     dialogRef.componentInstance.redirectTo = "name/e-mail";
  }

  confirmLoginPassword(){
    this.dialogRef.close()
    const dialogRef = this.dialog.open(ConfirmLoggedUserComponent, {
      width: '600px'
     });
     dialogRef.componentInstance.redirectTo = "password";
  }
}
