import { User } from './../../core/Interfaces/user';
import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../core/service/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss'
})
export class EditProfileComponent implements OnInit {
  _AuthService = inject(AuthService);
  _Router = inject(Router);
  errorMessage:string ='';
  isLoading:boolean = false;
  editProfileForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    phone : new FormControl(null, [Validators.required, Validators.pattern('^01[0125][0-9]{8}$')] )
  });
  ngOnInit(): void {
    let user:User = jwtDecode(localStorage.getItem('token') as string);
    this._AuthService.getUserDetails(user.id).subscribe({
      next:(res)=>{
        console.log(res)
        this.editProfileForm.patchValue({
          name: res?.data?.name,
          email: res?.data?.email,
          phone:res?.data?.phone
        })
      }
    })
  }
  sendData() {
    this.isLoading = true;
    this._AuthService.updateProfile(this.editProfileForm.value).subscribe({
      next: (res) => {
        this.isLoading = false;
        if(res.message === "success")
          this._Router.navigate(['/profile'])
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err?.error?.errors?.msg;
      }
    })
  }
}
