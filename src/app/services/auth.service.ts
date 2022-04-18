import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Auth } from '../models/auth.dto';
import { User } from '../models/user.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl: string = `${environment.API_URL}/api/auth`;

  constructor(
    private http: HttpClient
  ) { }

  login(email: string, password: string): Observable<Auth> {
    return this.http.post<Auth>(`${this.apiUrl}/login`, {email, password});
  }

  profile(token: string): Observable<User> {
    //const headers: HttpHeaders = new HttpHeaders();
    //headers.set('Authorization', `Bearer ${token}`);

    return this.http.get<User>(`${this.apiUrl}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
