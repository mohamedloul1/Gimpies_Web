import { Component } from '@angular/core';
import {UserSessionService} from "./services/user-session.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(private userSession: UserSessionService) {
    // Dit roept de service direct aan
    console.log('AppComponent geladen');
  }
  title = 'GimpiesWeb';
}
