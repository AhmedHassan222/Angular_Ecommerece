import { CanActivateFn } from '@angular/router';

export const guestGuard: CanActivateFn = () => {
  if (typeof localStorage !== "undefined")
    return localStorage.getItem('token') !== null ? true : false;
  return false;
};
