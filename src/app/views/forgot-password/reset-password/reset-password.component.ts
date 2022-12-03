import { UserService } from './../../../services/user/user.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Router, ActivatedRoute } from '@angular/router';
import { confirmPasswordEqualsValidator } from '../../../password-validators/confirm-password-equals.validator';
import Swal from 'sweetalert2';
import { LowercaseCharacterValidationService } from 'src/app/password-validators/lowercase-character-validation.service';
import { UppercaseCharacterValidationService } from 'src/app/password-validators/uppercase-character-validation.service';
import { NumberCharacterValidationService } from 'src/app/password-validators/number-character-validation.service';
import { SpecialCharacterValidationService } from 'src/app/password-validators/special-character-validation.service';
import { Min6CharactersValidationService } from 'src/app/password-validators/min-6-characters-validation.service';

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
    private activatedRoute: ActivatedRoute,
    private specialCharacterValidationService: SpecialCharacterValidationService,
    private numberCharacterValidationService: NumberCharacterValidationService,
    private uppercaseCharacterValidationService: UppercaseCharacterValidationService,
    private lowercaseCharacterValidationService: LowercaseCharacterValidationService,
    private min6CharactersValidationService: Min6CharactersValidationService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required,
        this.specialCharacterValidationService.noSpecialCharacter(),
        this.numberCharacterValidationService.numberCharacter(),
        this.uppercaseCharacterValidationService.noUppercaseCharacter(),
        this.lowercaseCharacterValidationService.noLowercaseCharacter(),
        this.min6CharactersValidationService.minLength6()]],
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
    user.confirmPassword = this.form.get("passwordConfirm").value
    user.randomCode = this.form.get('code').value;

    Swal.fire({
      title: '<p style="font-family: Paytone One; font-size:26px; margin: auto;">Are you sure?</p> <p style="font-family: Paytone One; color: rgb(121, 121, 121);margin: auto;">Please, make sure that your password is correct!</p> ',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '<p style="font-family: Paytone One; margin: auto;">Yes!</p> ',
      cancelButtonText: '<p style="font-family: Paytone One; margin: auto;">Cancel</p> ',
      allowOutsideClick: false
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
            title: '<p style="font-family: Paytone One; margin: auto;">Your password has been successfully updated!</p> '!
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
            title: '<p style="font-family: Paytone One; margin: auto;">Wrong code! Please, type the correct code that was sent to your e-mail.</p> '!
          })
          this.form.get("code").setErrors({invalid: true});
        })
      }
    })
  }

}
