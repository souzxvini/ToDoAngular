import { Min6CharactersValidationService } from './../../password-validators/min-6-characters-validation.service';
import { LowercaseCharacterValidationService } from './../../password-validators/lowercase-character-validation.service';
import { UppercaseCharacterValidationService } from './../../password-validators/uppercase-character-validation.service';
import { NumberCharacterValidationService } from './../../password-validators/number-character-validation.service';
import { UserExistsValidationService } from './../../services/user/user-exists-validation.service';
import { UserService } from './../../services/user/user.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/models/user.model';
import Swal from 'sweetalert2';
import { SpecialCharacterValidationService } from 'src/app/password-validators/special-character-validation.service';
import { confirmPasswordEqualsValidator } from 'src/app/password-validators/confirm-password-equals.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup
  hidePassword = true;
  hidePasswordConfirm = true;
  @ViewChild('myForm') myForm;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private userExistsValidationService: UserExistsValidationService,
    private specialCharacterValidationService: SpecialCharacterValidationService,
    private numberCharacterValidationService: NumberCharacterValidationService,
    private uppercaseCharacterValidationService: UppercaseCharacterValidationService,
    private lowercaseCharacterValidationService: LowercaseCharacterValidationService,
    private min6CharactersValidationService: Min6CharactersValidationService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email],  [this.userExistsValidationService.userExists()]],
      password: [null, [
        Validators.required,
        this.specialCharacterValidationService.noSpecialCharacter(),
        this.numberCharacterValidationService.numberCharacter(),
        this.uppercaseCharacterValidationService.noUppercaseCharacter(),
        this.lowercaseCharacterValidationService.noLowercaseCharacter(),
        this.min6CharactersValidationService.minLength6()
      ]],
      passwordConfirm: [null, Validators.required]
    },{
      validators:[confirmPasswordEqualsValidator]
    })
  }

  signup(){
    let user = new User();

    user.name = this.form.get("name").value
    user.email = this.form.get("email").value
    user.password = this.form.get("password").value
    user.confirmPassword = this.form.get("passwordConfirm").value

    Swal.fire({
      title: '<p style="font-family: Paytone One;">Are you sure?</p>',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '<p style="font-family: Paytone One; margin: auto">Yes!</p>',
      cancelButtonText: '<p style="font-family: Paytone One; margin: auto">Cancel</p>',
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.signup(user).subscribe( () => {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-start',
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
            title: '<p style="font-family: Paytone One;">Successfully registered!</p> '
          })
          this.router.navigate(['login']);
        }, ()=>{

        })

      }
    })
  }

  exit(): boolean{
    let leave: boolean = false;

    Swal.fire({
      title: '<p style="font-family: Paytone One;">Are you sure?</p>',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '<p style="font-family: Paytone One; margin: auto">Yes!</p>',
      cancelButtonText: '<p style="font-family: Paytone One; margin: auto">Cancel</p>',
    }).then((result) => {
      if (result.isConfirmed) {
        return leave = true;
      } else{
        return leave = false
      }
    })

    return leave;
  }
}
