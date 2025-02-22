import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _HttpClient = inject(HttpClient);
  private readonly _Router = inject(Router);
  private platform = inject(PLATFORM_ID);

  isLogin: WritableSignal<boolean> = signal(false);

  constructor() {
    this.saveUserData();
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
          this.isLogin.set(true);
        } catch (error) {
          this.isLogin.set(false);
          localStorage.removeItem('token');
        }
      }
    }
  };
  logOut() {
    if (isPlatformBrowser(this.platform)) localStorage.removeItem('token');
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
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/users/changeMyPassword`, model);
  }
  updateProfile(model: object): Observable<any> {
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/users/updateMe`, model)
  }
  getUserDetails(id: string): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/users/${id}`)
  }
}

