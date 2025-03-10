import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const guestGuard: CanActivateFn = () => {
 let  _Router = inject(Router);
 const platformId = inject(PLATFORM_ID); 
  if (isPlatformBrowser(platformId)) {
    if (localStorage.getItem('token'))
      return true;
    else {
      _Router.navigate(['/login']);
      return false;
    }
  }
  return false;
};
