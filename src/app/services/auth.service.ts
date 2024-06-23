import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/v1/users';

  constructor(private http: HttpClient) {}

  //Register user
  register(user: any): Observable<any> {
    console.log('user is here', user);
    return this.http.post(
      `${this.apiUrl}/register`,
      user,
      this.getHttpOptions()
    );
  }

  //login User
  login(user: any): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/login`, user, this.getHttpOptions())
      .pipe(
        map((response: any) => {
          console.log('response', response)
          if (response.success) {
            // Save access token to memory or localStorage
            if (response?.data?.token) {
              localStorage.setItem('accessToken', response.data.token);
              let currUser = JSON.stringify(response.data.loggedInUser);
              localStorage.setItem('user', currUser);
            }
            // Save refresh token to httpOnly cookie
            if (response.message.refreshToken) {
              console.log('refreshtoken saving');

              
            }
          }

          return response;
        })
      );
  }

  //logout user
  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem('accessToken');
  }

  // Get token from local storage
  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  //HTTP Options with authorization header
  private getHttpOptions() {
    const token = this.getAccessToken();
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (token) {
      headers = headers.append('Authorization', `Bearer ${token}`);
    }
    return { headers: headers };
  }
}
