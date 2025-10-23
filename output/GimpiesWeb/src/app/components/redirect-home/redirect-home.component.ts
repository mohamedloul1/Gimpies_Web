import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserSessionService } from '../../services/user-session.service';

@Component({
  selector: 'app-redirect-home',
  template: '',
})
export class RedirectHomeComponent implements OnInit {
  private userSession = inject(UserSessionService);
  private router = inject(Router);

  ngOnInit(): void {
    const userName = this.userSession.getUserName();
    const userRole = this.userSession.getUserRole();

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
