import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const guestGuard: CanActivateFn = () => {
 let  _Router = inject(Router)
  if (typeof localStorage !== "undefined") {
    if (localStorage.getItem('token') !== null)
      return true;
    else {
      _Router.navigate(['/login']);
      return false;
    }
  }
  return false;
};
