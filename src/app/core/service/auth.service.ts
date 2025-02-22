import { environment } from './../environments/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _HttpClient = inject(HttpClient);
  private readonly _Router = inject(Router);
  private platform = inject(PLATFORM_ID);

  userData: BehaviorSubject<any> = new BehaviorSubject(null);
  constructor() {
    if (isPlatformBrowser(this.platform)) {
      if (localStorage.getItem('token')) {
        this.saveUserData();
      }
    }
  }
  register(model: object): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signup`, model);
  }
  login(model: object): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signin`, model);
  }
  saveUserData(): void {
    if (isPlatformBrowser(this.platform)) {

      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decoded = jwtDecode(token);
          this.userData.next(decoded);
        } catch (error) {
          localStorage.removeItem('token');
        }
      }
    }
  };
  logOut() {
    localStorage.removeItem('token');
    this._Router.navigate(['/auth/login'])
  }
  verifyEmail(model: object): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords`, model);
  }
  verifyCode(model: object): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode`, model);
  }
  forgetPassword(model: object): Observable<any> {
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/auth/resetPassword`, model);
  }
  changePassword(model: object): Observable<any> {
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/users/changeMyPassword`, model, {
      headers: {
        token: (localStorage.getItem("token") || '')
      }
    });
  }
  updateProfile(model: object): Observable<any> {
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/users/updateMe`, model,
      {
        headers: {
          token: localStorage.getItem('token') as string
        }
      }
    )
  }
  getUserDetails(id: string): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/users/${id}`)
  }
}

