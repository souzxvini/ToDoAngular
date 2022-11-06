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
      sessionStorage.setItem('user', user.email);
			sessionStorage.setItem('token', 'Bearer ' + resp.token);
			return resp;
    }));
  }

	signout() {
		sessionStorage.removeItem('user');
		sessionStorage.removeItem('token');

		this.router.navigate(['login']);
	}

	isUserSignedin() {
		return sessionStorage.getItem('token') !== null;
	}

	getSignedinUser() {
		return sessionStorage.getItem('user') as string;
	}

	getToken() {
		let token = sessionStorage.getItem('token') as string;
		return token;
	}

  sendEmailCode(email: string){
    return this.http.get<any>(`${API}/auth/sendEmailCode?email=${email}`)
  }
}
