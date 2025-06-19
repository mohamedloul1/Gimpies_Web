import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { UserSessionService } from "../../../services/user-session.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() collapsed = false;
  @Output() closeSidebar = new EventEmitter<void>();

  username: string = '';
  userRole: string = '';

  constructor(private userSession: UserSessionService) {}

  ngOnInit(): void {
    this.userSession.userName$.subscribe(name => this.username = name);
    this.userSession.userRole$.subscribe(role => this.userRole = role);
  }

  logout(): void {
    console.log('Logging out...');
  }

  onLinkClick(): void {
    this.closeSidebar.emit();
  }
}
