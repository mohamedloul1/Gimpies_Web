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
  private _userID$ = new BehaviorSubject<number | null>(null);


  setSession(userName: string, userRole: string, userID: number): void {
    this._userName$.next(userName);
    this._userRole$.next(userRole);
    this._userID$.next(userID);
  }

  get userName$() {
    return this._userName$.asObservable();
  }

  get userRole$() {
    return this._userRole$.asObservable();
  }
  get userID$() {
    return this._userID$.asObservable();
  }

  getUserName(): string {
    return this._userName$.getValue();
  }

  getUserRole(): string {
    return this._userRole$.getValue();
  }
  getUserID(): any {
    return this._userID$.getValue();
  }


  clearSession(): void {
    this._userName$.next('');
    this._userRole$.next('');
    this._userID$.next(null);
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
