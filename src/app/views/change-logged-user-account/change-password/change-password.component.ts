import { UserService } from '../../../services/user/user.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SpecialCharacterValidationService } from 'src/app/password-validators/special-character-validation.service';
import { NumberCharacterValidationService } from 'src/app/password-validators/number-character-validation.service';
import { UppercaseCharacterValidationService } from 'src/app/password-validators/uppercase-character-validation.service';
import { LowercaseCharacterValidationService } from 'src/app/password-validators/lowercase-character-validation.service';
import { Min6CharactersValidationService } from 'src/app/password-validators/min-6-characters-validation.service';
import { confirmPasswordEqualsValidator } from 'src/app/password-validators/confirm-password-equals.validator';

@Component({
  selector: 'app-change-profile',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  form: FormGroup
  @ViewChild('myForm') myForm;
  hidePassword = true;
  hidePasswordConfirm = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
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
      passwordConfirm: [null, [Validators.required]]
    },{
      validators:[confirmPasswordEqualsValidator]
    })

    this.form.get('email').setValue(this.authService.getSignedinUserEmail())
    this.form.get('email').disable()
  }

  confirm(): boolean{
    let user = new User()
    user.password = this.form.get('password').value
    user.confirmPassword = this.form.get('passwordConfirm').value

    Swal.fire({
      title: '<p style="font-family: Paytone One;">Are you sure? It will be necessary to log-in again!</p>',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '<p style="font-family: Paytone One; margin: auto">Yes, change it!</p>',
      cancelButtonText: '<p style="font-family: Paytone One; margin: auto">No!</p>',
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.changeLoggedUserPassword(user, this.authService.getSignedinUserEmail()).subscribe(() => {
              this.authService.signout();
              return true;
          })

        }
    })
    return false;
  }
}
