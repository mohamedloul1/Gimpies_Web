import { Routes, RouterModule } from '@angular/router';
import { RouterContainerMagicComponent } from "@magic-xpa/angular";
import { CommonModule } from "@angular/common";
import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout/layout.component'; // <-- importeer je layout

export const routes: Routes = [

  // Login zonder sidebar
  {
    path: 'login',
    component: RouterContainerMagicComponent,
  },

  // Alles onder /admin toont sidebar via layout
  {
    path: 'admin',
    component: LayoutComponent, // <-- bevat sidebar
    children: [
      {
        path: '',
        component: RouterContainerMagicComponent, // hoofdpagina van admin
      },
      {
        path: '**',
        component: RouterContainerMagicComponent, // overige admin pagina's
      }
    ]
  },

  // redirect alles onbekends naar login
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
