import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const _ToastrService = inject(ToastrService)
  return next(req).pipe(catchError((err) => {
    if(req.url.includes(environment.baseUrl)){
      _ToastrService.error(err?.error?.message);
    }
    return throwError(() => err)
  }));
};
