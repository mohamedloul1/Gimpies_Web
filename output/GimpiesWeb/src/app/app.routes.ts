import { Routes, RouterModule } from '@angular/router';
import { RouterContainerMagicComponent } from "@magic-xpa/angular";
import { CommonModule } from "@angular/common";
import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout/layout.component'; // Zorg dat dit pad klopt

export const routes: Routes = [
  // Login zonder layout
  {
    path: 'login',
    component: RouterContainerMagicComponent
  },

  // Routes met layout (admin en sales)
  {
    path: '',
    component: LayoutComponent, // Bevat sidebar, header, etc.
    children: [
      {
        path: 'admin',
        component: RouterContainerMagicComponent
      },
      {
        path: 'sales',
        component: RouterContainerMagicComponent
      },
      {
        path: 'logout',
        component: RouterContainerMagicComponent
      },
      {
        path: '**',
        component: RouterContainerMagicComponent // fallback binnen layout
      }
    ]
  },

  // Fallback buiten layout
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class MagicRoutingModule {}
