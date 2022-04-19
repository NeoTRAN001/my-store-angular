import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, switchMap, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { Auth } from '../models/auth.dto';
import { User } from '../models/user.dto';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl: string = `${environment.API_URL}/api/auth`;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  login(email: string, password: string): Observable<Auth> {
    return this.http.post<Auth>(`${this.apiUrl}/login`, {email, password})
    .pipe(
      tap(response => this.tokenService.saveToken(response.access_token))
    );
  }

  getProfile(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/profile`)
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

  loginAndGet(email: string, password: string): Observable<User> {
    return this.login(email, password)
      .pipe(
        switchMap(rta => this.profile(rta.access_token))
      );
  }
}
