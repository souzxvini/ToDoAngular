import { UserService } from './../../../services/user/user.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserExistsValidationService } from 'src/app/services/user/user-exists-validation.service';

@Component({
  selector: 'app-change-profile',
  templateUrl: './change-profile.component.html',
  styleUrls: ['./change-profile.component.css']
})
export class ChangeProfileComponent implements OnInit {

  form: FormGroup
  @ViewChild('myForm') myForm;
  isLoading: boolean = false

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private userExistsValidationService: UserExistsValidationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email], [this.userExistsValidationService.userExists()]],
    })

    this.form.get('name').setValue(this.authService.getSignedinUserName())
    this.form.get('email').setValue(this.authService.getSignedinUserEmail())
  }

  confirm(): boolean{
    let user = new User()

    user.email = this.form.get('email').value
    user.name = this.form.get('name').value

    Swal.fire({
      title: '<p style="font-family: Paytone One;">Are you sure? It will be necessary to log-in again!</p>',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '<p style="font-family: Paytone One; margin: auto">Yes, update it!</p>',
      cancelButtonText: '<p style="font-family: Paytone One; margin: auto">No!</p>',
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        this.isLoading = true
        this.userService.updateUserData(user, this.authService.getSignedinUserEmail()).subscribe(() => {
              this.authService.signout();
              return true;
          }, () => {
            this.isLoading = false
          })

        }
    })
    return false;
  }
}
