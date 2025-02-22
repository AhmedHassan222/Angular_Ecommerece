import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID); // Inject PLATFORM_ID

  if (isPlatformBrowser(platformId)) {
    const token = localStorage.getItem('token');
    if (token !== null) {
      req = req.clone({
        setHeaders: { token: token }
      });
    }
  }
  return next(req);
};
