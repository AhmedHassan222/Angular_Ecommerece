import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/service/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  isLoading:boolean = false;
  hidden:boolean= true;

  private readonly _AuthService = inject(AuthService)
  private readonly _Router = inject(Router)
  private readonly _ToastrService = inject(ToastrService)
  errorMessage:string = '';
  registerForm:FormGroup = new FormGroup({
    name : new FormControl(null, [Validators.required]),
    email : new FormControl(null, [Validators.required, Validators.email] ),
    password : new FormControl(null , [Validators.required, Validators.pattern('[a-zA-Z0-9]{6,}')] ),
    rePassword : new FormControl(null),
    phone : new FormControl(null, [Validators.required, Validators.pattern('^01[0125][0-9]{8}$')] )
  }, this.confirmPassword);


  // functions 
  toggleAttribute():void {
    this.hidden = !this.hidden;
  }

  sendData():void 
  {
    if(this.registerForm.valid)
    {
      this.isLoading = true;
      this._AuthService.register(this.registerForm.value).subscribe({
        next:(res)=>{
          this.isLoading = false;
          if(res?.message === "success")
          {
            localStorage.setItem('token',res.token)
            this._AuthService.saveUserData();
            this._Router.navigate(['/products'])
            this._ToastrService.success(`Welcome ${res?.user?.name}`);
            // store toke
          }
        },
        error:(err:HttpErrorResponse)=>{
          this.isLoading = false;
          this.errorMessage = err?.error?.message

        },
      })
    }else{
      this.registerForm.setErrors({mismatch:true});
      this.registerForm.markAllAsTouched();
    }
    
  }

  confirmPassword(g:AbstractControl)
  {
    if(g.get('password')?.value === g.get('rePassword')?.value)
      return null;
    else 
      return {mismatch:true}
  }

}
