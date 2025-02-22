import { AuthService } from './../../core/service/auth.service';
import { Component, ElementRef, inject, QueryList, signal, ViewChildren, viewChildren, WritableSignal } from '@angular/core';
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

  private readonly _AuthSErvice = inject(AuthService);
  private readonly _Router = inject(Router);
  isLoading: WritableSignal<boolean> = signal(false);
  status: WritableSignal<string> = signal('verifyCode');
  errorMessage: WritableSignal<string> = signal("");
  successMessage: WritableSignal<string> = signal("");
  @ViewChildren('input') inputs!: QueryList<ElementRef>;

  // forms >>
  verifyEmail: WritableSignal<FormGroup> = signal(new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email])
  }));

  verifyCode: WritableSignal<FormGroup> = signal(new FormGroup({
    resetCode: new FormControl(null, [Validators.required, Validators.pattern('[0-9]{6}')]),
  }));

  resetPassword: WritableSignal<FormGroup> = signal(new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z0-9]{6,}')]),

  }));




  // functions >>
  verifyEmailFun(): void {
    this.resetPassword().get('email')?.patchValue(this.verifyEmail().get('email')?.value)
    this.successMessage.set('');
    this.errorMessage.set('');
    this.isLoading.set(true);
    this._AuthSErvice.verifyEmail(this.verifyEmail().value).subscribe({
      next: (res) => {
        this.status.set("verifyCode");
        this.successMessage.set(res?.message);

      },
      error: (err) => {
        this.errorMessage.set(err?.error?.message);
      },
      complete: () => {
        this.isLoading.set(false);
      }
    })

  }

  verifyCodeFun(): void {
    this.successMessage.set('');
    this.errorMessage.set('');
    this.isLoading.set(true);
    this._AuthSErvice.verifyCode(this.verifyCode().value).subscribe({
      next: () => {
        this.status.set("forgetPassword");

      },
      error: (err) => {
        this.errorMessage.set(err?.error?.message);
      },
      complete: () => {
        this.isLoading.set(false);
      }
    })

  }

  forgetPasswordFun(): void {
    this.successMessage.set('');
    this.errorMessage.set('');
    this.isLoading.set(true);
    this._AuthSErvice.forgetPassword(this.resetPassword().value).subscribe({
      next: (res) => {
        localStorage.setItem('token', res?.token)
        this.status.set('verifyEmail');
        this._AuthSErvice.saveUserData();
        this._Router.navigate(['/'])
      },
      complete: () => {
        this.isLoading.set(false);
      }
    })
  }
}