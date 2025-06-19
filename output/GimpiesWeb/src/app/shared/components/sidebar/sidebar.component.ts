import {Component, OnInit, Output, EventEmitter, Input, ChangeDetectorRef} from '@angular/core';
import {UserSessionService} from "../../../services/user-session.service";
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";


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

  constructor(
    private userSession: UserSessionService,
    private cdRef: ChangeDetectorRef,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.userSession.userName$.subscribe(name => this.username = name);
    this.userSession.userRole$.subscribe(role => this.userRole = role);
  }

  clearMagicCookies(): void {
    document.cookie = 'userName=; Max-Age=0; path=/;';
    document.cookie = 'userRole=; Max-Age=0; path=/;';
  }

  logout(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      panelClass: 'custom-dialog-container',
      data: {
        title: 'Bevestigen',
        message: 'Weet je zeker dat je wilt uitloggen?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Bevestigd
        this.userSession.clearSession();
        this.clearMagicCookies();
        window.location.href = '/login';
      }
    });
  }

  onLinkClick(): void {
    this.closeSidebar.emit();
  }
}
