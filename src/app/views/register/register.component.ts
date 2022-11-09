import { NumberCharacterValidationService } from './../../password-validators/number-character-validation.service';
import { UserExistsValidationService } from './../../services/user/user-exists-validation.service';
import { UserService } from './../../services/user/user.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import Swal from 'sweetalert2';
import { SpecialCharacterValidationService } from 'src/app/password-validators/special-character-validation.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup
  hidePassword = true;
  hidePasswordConfirm = true;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private userExistsValidationService: UserExistsValidationService,
    private specialCharacterValidationService: SpecialCharacterValidationService,
    private numberCharacterValidationService: NumberCharacterValidationService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email],  [this.userExistsValidationService.userExists()]],
      password: [null, [
        Validators.required,
        this.specialCharacterValidationService.noSpecialCharacter(),
        this.numberCharacterValidationService.numberCharacter()
      ]]
    })
  }

  signup(){
    let user = new User();

    user.name = this.form.get("name").value
    user.email = this.form.get("email").value
    user.password = this.form.get("password").value

    Swal.fire({
      title: 'Are you sure?',
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
        this.userService.signup(user).subscribe( () => {
          this.router.navigate(['login']);
        })
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
          title: 'Successfully registered!'
        })
      }
    })

  }
}
