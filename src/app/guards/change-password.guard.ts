import { UserService } from 'src/app/services/user/user.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  hasAuthorities: Observable<boolean>

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


      if(!this.authService.isUserSignedin()){
        this.router.navigate(['login']);
        return false;
      } else if(sessionStorage.getItem('userRole')){
        return true;
      } else{
        this.router.navigate(['home']);
        return false;
      }


  }

}
