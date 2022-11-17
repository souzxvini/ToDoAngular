import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
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
    public dialogRef: MatDialogRef<MenuOptionsComponent>
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
}
