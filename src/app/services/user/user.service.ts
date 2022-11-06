import { Observable } from 'rxjs';
import { User } from './../../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const API = environment.API

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  signup(user: User): Observable<any>{
    return this.http.post<any>(`${API}/user/register`, user, this.httpOptions);
  }

  updateForgotPassword(user: User): Observable<any>{
    return this.http.put<any>(`${API}/user/updateForgotPassword`, user, this.httpOptions);
  }

}
