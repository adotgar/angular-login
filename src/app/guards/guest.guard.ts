import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../shared/auth.service';

export const canActivate: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isUserLoggedIn()){
    router.navigate(['/']);
  }

  return !authService.isUserLoggedIn();
};

export const guestGuard: CanActivateFn = (route, state) => canActivate(route, state);
