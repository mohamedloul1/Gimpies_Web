import { Routes, RouterModule } from '@angular/router';
import { RouterContainerMagicComponent } from "@magic-xpa/angular";
import { CommonModule } from "@angular/common";
import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout/layout.component'; // voeg dit toe

export const routes: Routes = [
  // Login zonder layout
  {
    path: 'login',
    component: RouterContainerMagicComponent,
  },

  // Routes met layout (sidebar, header, etc.)
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'admin',
        component: RouterContainerMagicComponent,
      },
      {
        path: 'sales',
        component: RouterContainerMagicComponent,
      },
    ]
  },

  // fallback
  {
    path: '**',
    redirectTo: 'login',
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class MagicRoutingModule {}
