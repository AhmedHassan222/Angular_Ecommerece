import { Component, inject, OnInit, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { User } from '../../core/models/user';
import { isPlatformBrowser, TitleCasePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/service/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [TitleCasePipe, RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);
  private readonly _PLATFORM_ID = inject(PLATFORM_ID);
  user: WritableSignal<User> = signal({} as User);
  userName: WritableSignal<string> = signal("");
  ngOnInit(): void {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      this.user.set(jwtDecode(localStorage.getItem('token') as string))
      this._AuthService.getUserDetails(this.user().id).subscribe({
        next: (res) => {
          this.user.set(res.data);
          this.userName.set(this.user()?.name);
        }
      })
    }
  }
  logOut(): void {
    this._AuthService.logOut();
    this._Router.navigate(['/login'])
    this._AuthService.saveUserData();
    this._AuthService.isLogin.set(false);
  }
}
