import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  mobileSidebarOpen = false;



  closeMobileSidebar() {
    this.mobileSidebarOpen = false;
  }

  openMobileSidebar() {
    this.mobileSidebarOpen = true;
  }


}

