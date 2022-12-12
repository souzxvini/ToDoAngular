import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  isUserLoggedIn: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isUserLoggedIn = this.authService.isUserSignedin()
  }

}
