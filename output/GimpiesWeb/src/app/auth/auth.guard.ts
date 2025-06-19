import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { UserSessionService } from '../services/user-session.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private userSession: UserSessionService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const userName = this.userSession.getUserName();
    const userRole = this.userSession.getUserRole();

    if (!userName) {
      console.warn('⛔ Geen userName in sessie – redirect naar login');
      this.router.navigate(['/login']);
      return false;
    }

    const allowedRoles: string[] = route.data['roles'];

    if (allowedRoles && !allowedRoles.includes(userRole)) {
      console.warn(`⛔ Rol "${userRole}" is niet toegestaan`);
      this.router.navigate(['/unauthorized']);
      return false;
    }

    return true;
  }
}
