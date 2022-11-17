import { AuthService } from './../../../services/auth/auth.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-email-confirm',
  templateUrl: './email-confirm.component.html',
  styleUrls: ['./email-confirm.component.css']
})
export class EmailConfirmComponent implements OnInit {

  form: FormGroup
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    public dialogRef: MatDialogRef<EmailConfirmComponent>,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email]]
    })
  }

  sendCode(){
    this.isLoading = true
    let email = this.form.get('email').value;
    this.form.get('email').disable();

    this.authService.sendEmailCode(email).subscribe( () => {
      this.isLoading = false;
      this.dialogRef.close();

      const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 7000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      Toast.fire({
        icon: 'warning',
        title: `<p style="font-family: Paytone One;">The confirmation code was sent to your e-mail!</p> `!
      })


      this.router.navigate([`reset-password/${email}`]);
    }, () => {
      this.isLoading = false;
      this.form.get('email').enable();
      const Toast = Swal.mixin({
        toast: true,
        position: 'top',
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
        title: `<p style="font-family: Paytone One;">There's no user registered with this e-mail!</p> `!
      })

      this.form.get('email').setErrors({invalid: true})
    })
  }

  cancel(): void{
    this.dialogRef.close();
    this.form.reset();
  }

}
