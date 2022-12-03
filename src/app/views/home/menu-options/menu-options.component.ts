import { EditProfileDialogComponent } from './../../dialogs/edit-profile/edit-profile-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menu-options',
  templateUrl: './menu-options.component.html',
  styleUrls: ['./menu-options.component.css']
})
export class MenuOptionsComponent implements OnInit {

  userName: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    public dialogRef: MatDialogRef<MenuOptionsComponent>,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.userName = this.authService.getSignedinUserName();
  }
  signout(){
    Swal.fire({
      title: '<p style="font-family: Paytone One; margin: auto;">Are you sure you want to logout?</p>',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '<p style="font-family: Paytone One; margin: auto">Yes!</p>',
      cancelButtonText: '<p style="font-family: Paytone One; margin: auto">Cancel</p>',
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        this.dialogRef.close();
        this.authService.signout();
        this.router.navigate(["login"]);
        }
      })
  }

  close(){
    this.dialogRef.close()
  }

  editProfile(){
    this.dialogRef.close()
    const dialogRef = this.dialog.open(EditProfileDialogComponent, {
      width: '600px'
     });
  }
}
