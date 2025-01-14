import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/service/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  errorMessage:string = "";
  isLoading:boolean = false;
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z0-9]{6,}')]),
  });

  _authService:AuthService= inject(AuthService);
  _ToastrService= inject(ToastrService);
  _Router= inject(Router);
  hidden:boolean= true;



  // functions 
  toggleAttribute():void {
    this.hidden = !this.hidden;
  }


  sendData():void 
  {
    this.isLoading = true;
    this._authService.login(this.loginForm.value).subscribe({
      next:(res)=>{
        this.isLoading = false;
        console.log("res =>" , res)
         if(res?.message === "success")
          {
            // go home and store token
            localStorage.setItem('token',res.token)
            this._authService.saveUserData();
            this._Router.navigate(['/products']);
            this._ToastrService.success(`Welcome Back ${res?.user?.name}`);
          }
      },
      error:(err:HttpErrorResponse)=>{
        this.isLoading = false;
        this.errorMessage = err?.error?.message;
      }
    })
  }
}
