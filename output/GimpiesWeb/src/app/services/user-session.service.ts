import { Injectable } from '@angular/core';
//Dit is een Angular @Injectable service.
//
// Deze service bewaart gebruikersdata, zoals de gebruikersnaam.
//
// Singleton: beschikbaar in de hele app.
@Injectable({
  providedIn: 'root' // dit zorgt dat de service overal beschikbaar is
})
export class UserSessionService {
  private _username: string = '';

  set username(name: string) {
    this._username = name;
  }

  get username(): string {
    return this._username;
  }
}
