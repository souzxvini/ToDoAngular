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

    let email = this.form.get('email').value;

    this.authService.sendEmailCode(email).subscribe( () => {
      this.dialogRef.close();
      Swal.fire(
        'Success!',
        'Code was sent to your e-mail, check it out!',
        'success'
      )

      this.router.navigate([`reset-password/${email}`]);
    })
  }

  cancel(): void{
    this.dialogRef.close();
    this.form.reset();
  }

}
