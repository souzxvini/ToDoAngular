import { UserService } from './../../../services/user/user.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  form: FormGroup;

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
      code: [null, [Validators.required]],
    })

    const id =  this.activatedRoute.snapshot.paramMap.get('email');
    this.activatedRoute.params.subscribe( data => {
      this.form.get('email').setValue(id)
    })

    this.form.get('email').disable();
  }

  confirmNewPassword(){
    let user = new User();

    user.email = this.form.get('email').value;
    user.password = this.form.get('password').value;
    user.randomCode = this.form.get('code').value;

    this.userService.updateForgotPassword(user).subscribe( () => {
      this.router.navigate(['login']);
    })

  }

}
