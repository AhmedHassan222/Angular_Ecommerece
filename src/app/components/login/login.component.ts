import { Component, inject, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/service/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly _AuthService: AuthService = inject(AuthService);
  private readonly _ToastrService = inject(ToastrService);
  private readonly _Router = inject(Router);
  private readonly _PLATFORM_ID = inject(PLATFORM_ID);
  errorMessage: WritableSignal<string> = signal("");
  isLoading: WritableSignal<boolean> = signal(false);
  hidden: WritableSignal<boolean> = signal(true);
  loginForm: WritableSignal<FormGroup> = signal(new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z0-9]{6,}')]),
  }));

  // functions 
  toggleAttribute(): void {
    this.hidden.update(val => !val)
  }

  sendData(): void {
    this.isLoading.set(true);
    this._AuthService.login(this.loginForm().value).subscribe({
      next: (res) => {
        console.log("res =>", res)
        if (res?.message === "success") {
          if (isPlatformBrowser(this._PLATFORM_ID)) localStorage.setItem('token', res.token)
          this._AuthService.saveUserData();
          this._Router.navigate(['/products']);
          this._ToastrService.success(`Welcome Back ${res?.user?.name}`);
        }
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage.set(err?.error?.message);
      },
      complete: () => {
        this.isLoading.set(false)
      }
    })
  }
}
