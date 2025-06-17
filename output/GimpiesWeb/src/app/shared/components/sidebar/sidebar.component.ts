import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectorRef } from '@angular/core';
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

  constructor(
    private userSession: UserSessionService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Geef het wat tijd zodat LogOut de naam kan instellen
    setTimeout(() => {
      this.username = this.userSession.username;
      this.cdRef.detectChanges(); // Forceer hertekening
      console.log('Username opgehaald in SideBar:', this.username);
    }, 200); // eventueel hoger als Magic langzaam init is
  }

  logout(): void {
    console.log('Logging out...');
  }

  onLinkClick(): void {
    this.closeSidebar.emit();
  }
}
