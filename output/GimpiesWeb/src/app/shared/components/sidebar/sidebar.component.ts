import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() collapsed = false;
  @Output() closeSidebar = new EventEmitter<void>();
  logout(): void {
    // 👉 Hier kun je logica toevoegen om in de toekomst echt uit te loggen
    console.log('Logging out...');
    // Bijvoorbeeld navigeren naar loginpagina:
    // this.router.navigate(['/login']);
  }

  constructor() {}

  ngOnInit(): void {}

  onLinkClick(): void {
    this.closeSidebar.emit();
  }
}
