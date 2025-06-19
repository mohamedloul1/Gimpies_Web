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
}
