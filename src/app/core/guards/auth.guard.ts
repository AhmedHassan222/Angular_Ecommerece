import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  let _Router = inject(Router)
  const platformId = inject(PLATFORM_ID);
  if (isPlatformBrowser(platformId)) {
    if (!localStorage.getItem('token'))
      return true;
    else {
      _Router.navigate(['/products']);
      return false;
    }
  }
  return false;
};
