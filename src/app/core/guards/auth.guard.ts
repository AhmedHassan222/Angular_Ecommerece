import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  let _Router = inject(Router)
  if (typeof localStorage !== "undefined") {
    if (localStorage.getItem('token') == null)
      return true;
    else {
      _Router.navigate(['/products']);
      return false;
    }
  }
  return false;
};
