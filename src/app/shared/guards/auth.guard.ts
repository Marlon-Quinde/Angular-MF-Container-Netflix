import type { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  return !localStorage.getItem('signInUsuario');;
};
