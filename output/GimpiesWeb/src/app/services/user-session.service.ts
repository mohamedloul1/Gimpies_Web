import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserSessionService {
  constructor(private router: Router) {}
  private _userName$ = new BehaviorSubject<string>('');
  private _userRole$ = new BehaviorSubject<string>('');

  setSession(userName: string, userRole: string) {
    this._userName$.next(userName);
    this._userRole$.next(userRole);
  }

  get userName$() {
    return this._userName$.asObservable();
  }

  get userRole$() {
    return this._userRole$.asObservable();
  }

  getUserName(): string {
    return this._userName$.getValue();
  }

  getUserRole(): string {
    return this._userRole$.getValue();
  }

  clearSession(): void {
    this._userName$.next('');
    this._userRole$.next('');
  }

  redirectToHome(): void {
    const userName = this.getUserName();
    const userRole = this.getUserRole();

    if (!userName) {
      this.router.navigate(['/login']);
    } else if (userRole === 'admin') {
      this.router.navigate(['/admin']);
    } else if (userRole === 'sales') {
      this.router.navigate(['/sales']);
    } else {
      this.router.navigate(['/unauthorized']);
    }
  }
}
