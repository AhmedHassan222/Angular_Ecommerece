
import { Component, inject, WritableSignal, signal } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/service/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {
  private readonly _AuthService: AuthService = inject(AuthService);
  private readonly _ToastrService = inject(ToastrService);
  private readonly _Router = inject(Router);
  isLoading: WritableSignal<boolean> = signal(false);
  changePassword: WritableSignal<FormGroup> = signal(new FormGroup({
    currentPassword: new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z0-9]{6,}')]),
    password: new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z0-9]{6,}')]),
    rePassword: new FormControl(null)
  }, this.confirmPassword));


  sendData(): void {
    this.isLoading.set(true);
    this._AuthService.changePassword(this.changePassword().value).subscribe({
      next: (res) => {
        if (res?.message === "success") {
          this._AuthService.logOut();
          this._AuthService.saveUserData();
          this._Router.navigate(['/auth/login']);
          this._ToastrService.success('Password has been changed')
        }
      },
      complete: () => {
        this.isLoading.set(false);
      }
    })
  }

  confirmPassword(g: AbstractControl) {
    if (g.get('password')?.value === g.get('rePassword')?.value)
      return null;
    else
      return { mismatch: true }
  }

}
