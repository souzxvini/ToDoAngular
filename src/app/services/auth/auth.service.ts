import { User } from './../../models/user.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { map, Observable } from 'rxjs';

const API = environment.API

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  public authenticate(user: any): Observable<any>{
    return this.http.post<any>( `${API}/auth`, user, this.httpOptions).pipe(map((resp) => {
      sessionStorage.setItem('userEmail', resp.email);
      sessionStorage.setItem('userName', resp.name);
			sessionStorage.setItem('token', 'Bearer ' + resp.jwttoken);
			return resp;
    }));
  }

  public confirmAuthenticatedUser(user: User): Observable<any>{
    return this.http.post<any>( `${API}/auth/confirmAuthenticatedUserData`, user);
  }

	signout() {
		sessionStorage.removeItem('userEmail');
		sessionStorage.removeItem('userName');
		sessionStorage.removeItem('token');

		this.router.navigate(['login']);
	}

	isUserSignedin() {
		return sessionStorage.getItem('token') !== null;
	}

	getSignedinUserEmail() {
		return sessionStorage.getItem('userEmail') as string;
	}

  getSignedinUserName() {
		return sessionStorage.getItem('userName') as string;
	}

	getToken() {
		return sessionStorage.getItem('token') as string;
	}

  sendEmailCode(email: string){
    return this.http.get<any>(`${API}/auth/sendEmailCode?email=${email}`)
  }
}
