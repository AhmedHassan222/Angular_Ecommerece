import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  if(typeof localStorage !== "undefined")
    return localStorage.getItem('token') === null ? true : false;
  return false;
};
