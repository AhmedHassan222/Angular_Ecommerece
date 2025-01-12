
import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/service/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {
  errorMessage:string = "";
  isLoading:boolean = false;
  changePassword: FormGroup = new FormGroup({
    currentPassword: new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z0-9]{6,}')]),
    password: new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z0-9]{6,}')]),
    rePassword: new FormControl(null)
  } , this.confirmPassword);

  _authService:AuthService= inject(AuthService);
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
            this._Router.navigate(['/auth/login']);
          }
      },
      error:(err:HttpErrorResponse)=>{
        this.isLoading = false;
        this.errorMessage = err?.error?.message;
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
