import { EmailConfirmComponent } from './../forgot-password/email-confirm/email-confirm.component';
import { Router } from '@angular/router';
import { User } from './../../models/user.model';
import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup
  hidePassword = true;
  hidePasswordConfirm = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    })


  }

  login(){
    let user = new User();

    user.email = this.form.get("email").value
    user.password = this.form.get("password").value

    this.authService.authenticate(user).subscribe( data => {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      Toast.fire({
        icon: 'success',
        title: `<p style="font-family: Paytone One; margin: auto">Welcome, ${data.name}!</p> `
      })
      this.router.navigate(['home']);
    },() => {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      Toast.fire({
        icon: 'error',
        title: `<p style="font-family: Paytone One; margin: auto">Wrong credentials!</p> `

      })
    })
  }

  forgotPassword(): void {
    const dialogRef = this.dialog.open(EmailConfirmComponent, {
     width: '600px'
    });
    dialogRef.afterClosed().subscribe(() => {

    })
  }

}
