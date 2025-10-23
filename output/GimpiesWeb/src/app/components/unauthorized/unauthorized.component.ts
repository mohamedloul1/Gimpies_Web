import { Component, OnInit } from '@angular/core';
import { UserSessionService } from '../../services/user-session.service';


@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.scss']
})
export class UnauthorizedComponent implements OnInit {

  constructor(private userSession: UserSessionService) {}

  ngOnInit(): void {
  }
  goHome() {
    this.userSession.redirectToHome();
  }

}
