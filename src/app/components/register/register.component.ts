import { Component, inject, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/service/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private readonly _AuthService = inject(AuthService)
  private readonly _Router = inject(Router)
  private readonly _ToastrService = inject(ToastrService)
  private readonly _PLATFORM_ID = inject(PLATFORM_ID)
  isLoading: WritableSignal<boolean> = signal(false);
  hidden: WritableSignal<boolean> = signal(true);
  errorMessage: WritableSignal<string> = signal("");

  registerForm: WritableSignal<FormGroup> = signal(new FormGroup({
    name: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z0-9]{6,}')]),
    rePassword: new FormControl(null),
    phone: new FormControl(null, [Validators.required, Validators.pattern('^01[0125][0-9]{8}$')])
  }, this.confirmPassword));


  // functions 
  toggleAttribute(): void {
    this.hidden.update(val => !val)
  }

  sendData(): void {
    if (this.registerForm().valid) {
      this.isLoading.set(true);
      this._AuthService.register(this.registerForm().value).subscribe({
        next: (res) => {
          if (res?.message === "success") {
            if(isPlatformBrowser(this._PLATFORM_ID)) localStorage.setItem('token', res?.token)
            this._AuthService.saveUserData();
            this._Router.navigate(['/products'])
            this._ToastrService.success(`Welcome ${res?.user?.name}`);
          }
        },
        error: (err: HttpErrorResponse) => {
          this.errorMessage.set(err?.error?.message);
        },
        complete:()=>{
          this.isLoading.set(false);
        }
      })
    } else {
      this.registerForm().markAllAsTouched();
    }

  }

  confirmPassword(g: AbstractControl) {
    if (g.get('password')?.value === g.get('rePassword')?.value)
      return null;
    else
      return { mismatch: true }
  }

}
