import { Component, inject, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { User } from '../../core/Interfaces/user';
import { TitleCasePipe } from '@angular/common';
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
  user!: User;
  userName:string = "";
  _AuthService= inject(AuthService);
  _Router= inject(Router);
  ngOnInit(): void {
    let user:User = jwtDecode(localStorage.getItem('token') as string);
    this._AuthService.getUserDetails(user.id).subscribe({
      next:(res)=>{
        user = res.data;
        this.userName = user?.name;
      }
    })
  }
  logOut():void 
  {
    this._AuthService.logOut();
    this._Router.navigate(['/login'])
    this._AuthService.saveUserData();
    this._AuthService.userData.next(null);
  }
}
