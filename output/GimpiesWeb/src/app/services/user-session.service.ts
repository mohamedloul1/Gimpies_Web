import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserSessionService {
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
}
