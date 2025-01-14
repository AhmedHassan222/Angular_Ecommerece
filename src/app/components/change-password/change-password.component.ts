
import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/service/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [ ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {
  isLoading:boolean = false;
  changePassword: FormGroup = new FormGroup({
    currentPassword: new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z0-9]{6,}')]),
    password: new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z0-9]{6,}')]),
    rePassword: new FormControl(null)
  } , this.confirmPassword);

  _authService:AuthService= inject(AuthService);
  _ToastrService= inject(ToastrService);
  _Router= inject(Router);
  sendData():void 
  {
    this.isLoading = true;
    this._authService.changePassword(this.changePassword.value).subscribe({
      next:(res)=>{
        this.isLoading = false;
         if(res?.message === "success")
          {
            this._authService.logOut();
            this._authService.saveUserData();
            this._Router.navigate(['/auth/login']);
            this._ToastrService.success('Password has been changed')
          }
      },
      error:(err:HttpErrorResponse)=>{
        this.isLoading = false;
        this._ToastrService.error(err?.error?.message)

      }
    })
  }

    confirmPassword(g:AbstractControl)
    {
      if(g.get('password')?.value === g.get('rePassword')?.value)
        return null;
      else 
        return {mismatch:true}
    }
  
}
