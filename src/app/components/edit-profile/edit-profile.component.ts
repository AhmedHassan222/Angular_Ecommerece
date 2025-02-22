import { User } from './../../core/Interfaces/user';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
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
  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);
  errorMessage: WritableSignal<string> = signal('');
  isLoading: WritableSignal<boolean> = signal(false);
  editProfileForm: WritableSignal<FormGroup> = signal(new FormGroup({
    name: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    phone: new FormControl(null, [Validators.required, Validators.pattern('^01[0125][0-9]{8}$')])
  }));

  ngOnInit(): void {
    let user: User = jwtDecode(localStorage.getItem('token') as string);
    this._AuthService.getUserDetails(user.id).subscribe({
      next: (res) => {
        console.log(res)
        this.editProfileForm().patchValue({
          name: res?.data?.name,
          email: res?.data?.email,
          phone: res?.data?.phone
        })
      }
    })
  }
  sendData() {
    this.isLoading.set(true);
    this._AuthService.updateProfile(this.editProfileForm().value).subscribe({
      next: (res) => {
        if (res.message === "success")
          this._Router.navigate(['/profile'])
      },
      error: (err) => {
        this.errorMessage = err?.error?.errors?.msg;
      },
      complete:()=>{
        this.isLoading.set(true);
      }
    })
  }
}
