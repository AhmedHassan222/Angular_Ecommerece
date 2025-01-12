import { AuthService } from './../../core/service/auth.service';
import { Component, ElementRef, inject, QueryList, ViewChildren, viewChildren } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {
  // property 
  isLoading: boolean = false;
  status: string = 'verifyCode';
  errorMessage!: string;
  successMessage!: string;
  @ViewChildren('input') inputs!: QueryList<ElementRef>;
  // forms >>
  verifyEmail: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email])
  })
  verifyCode: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [Validators.required, Validators.pattern('[0-9]{6}')]),
  })
  resetPassword: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z0-9]{6,}')]),

  })

  // injection >>
  _AuthSErvice = inject(AuthService);
  _Router = inject(Router);


  // functions >>
  verifyEmailFun(): void {
    this.resetPassword.get('email')?.patchValue(this.verifyEmail.get('email')?.value)
    this.successMessage = '';
    this.errorMessage = '';
    this.isLoading = true;
    this._AuthSErvice.verifyEmail(this.verifyEmail.value).subscribe({
      next:(res)=>{
        this.isLoading = false;
        this.status = "verifyCode"
        this.successMessage = res?.message;

      },
      error:(err)=>{
        this.isLoading = false;
        this.errorMessage = err?.error?.message
      }
    })

  }
  verifyCodeFun(): void {
    this.successMessage = '';
    this.errorMessage = '';
    this.isLoading = true;
    this._AuthSErvice.verifyCode(this.verifyCode.value).subscribe({
      next:()=>{
        this.isLoading = false;
        this.status = "forgetPassword"

      },
      error:(err)=>{
        this.isLoading = false;
        this.errorMessage = err?.error?.message
      }
    })

  }
  forgetPasswordFun(): void {
    this.successMessage = '';
    this.errorMessage = '';
    this.isLoading = true;
    this._AuthSErvice.forgetPassword(this.resetPassword.value).subscribe({
      next:(res)=>{
        this.isLoading = false;
        localStorage.setItem('token',res?.token)
        this.status = 'verifyEmail';
        this._AuthSErvice.saveUserData();
        this._Router.navigate(['/'])

      },
      error:(err)=>{
        this.isLoading = false;
        this.errorMessage = err?.error?.message
      }
    })

  }


}
