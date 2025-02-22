import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  let _Router = inject(Router)
  if (isPlatformBrowser(PLATFORM_ID)) {
    if (localStorage.getItem('token') == null)
      return true;
    else {
      _Router.navigate(['/products']);
      return false;
    }
  }
  return false;
};
