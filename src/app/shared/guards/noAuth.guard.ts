import type { CanActivateFn } from '@angular/router';

export const noAuthGuard: CanActivateFn = (route, state) => {
  return !!localStorage.getItem('signInUsuario');
};
