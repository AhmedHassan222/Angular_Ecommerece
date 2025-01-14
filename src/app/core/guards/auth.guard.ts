import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  if (typeof localStorage !== "undefined")
    return localStorage.getItem('token') == null ? true : false;
  return false;
};
