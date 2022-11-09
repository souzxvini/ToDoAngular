import { UserService } from './../../../services/user/user.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Router, ActivatedRoute } from '@angular/router';
import { confirmPasswordEqualsValidator } from './confirm-password-equals.validator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  form: FormGroup;
  hidePassword = true;
  hidePasswordConfirm = true;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      passwordConfirm: [null, [Validators.required]],
      code: [null, [Validators.required, Validators.maxLength(6), Validators.minLength(6)]],
    }, {
      validators:[confirmPasswordEqualsValidator]
    })

    const id =  this.activatedRoute.snapshot.paramMap.get('email');

    this.form.get('email').setValue(id)
    this.form.get('email').disable();
  }

  confirmNewPassword(){
    let user = new User();

    user.email = this.form.get('email').value;
    user.password = this.form.get('password').value;
    user.randomCode = this.form.get('code').value;

    Swal.fire({
      title: 'Are you sure?',
      text: 'Please, make sure that your new password is corret.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!',
      customClass: {
        popup: 'swal2-popup'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.updateForgotPassword(user).subscribe( () => {
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
            icon: 'success',
            title: 'Your password has been successfully updated!'!
          })
          this.router.navigate(['login']);
        },() =>{
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
            title: 'Wrong code! Please, type the correct code that was sent to your e-mail.'!
          })
          this.form.get("code").setValue(null);
        })
      }
    })
  }

}
