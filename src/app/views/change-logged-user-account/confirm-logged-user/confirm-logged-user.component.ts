import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal, { SweetAlertIcon, SweetAlertPosition } from 'sweetalert2';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-confirm-logged-user',
  templateUrl: './confirm-logged-user.component.html',
  styleUrls: ['./confirm-logged-user.component.css']
})
export class ConfirmLoggedUserComponent implements OnInit {

  form: FormGroup
  hidePassword = true;
  hidePasswordConfirm = true;
  redirectTo: string;

  constructor(
    private dialogRef: MatDialogRef<ConfirmLoggedUserComponent>,
    private fb: FormBuilder,
    private authService: AuthService,
     private router: Router
    ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    })
  }

  close(){
    this.dialogRef.close()
  }

  login(){
    let user = new User();

    user.email = this.form.get("email").value
    user.password = this.form.get("password").value

    this.authService.confirmAuthenticatedUser(user).subscribe( data => {
      if(data == true){
        this.alert("top-end", "Correct credentials!", "success")

        if(this.redirectTo == "name/e-mail"){
          this.dialogRef.close()
          this.router.navigate([`edit-profile/${this.form.get('email').value}`]);
        } else{
          this.dialogRef.close()
          sessionStorage.setItem('userRole', "CHANGEPASSWORD");
          this.router.navigate([`edit-password/${this.form.get('email').value}`]);
        }
      } else{
        this.alert("top-end", "Wrong credentials!", "error")
      }



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

  alert(position: SweetAlertPosition, message: string, icon: SweetAlertIcon){
    const Toast = Swal.mixin({
      toast: true,
      position: `${position}`,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: `${icon}`,
      title: `<p style="font-family: Paytone One; margin: auto">${message}</p> `
    })
  }
}
