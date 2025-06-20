import { Routes, RouterModule } from '@angular/router';
import { RouterContainerMagicComponent } from "@magic-xpa/angular";
import { CommonModule } from "@angular/common";
import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout/layout.component'; // Zorg dat dit pad klopt
import { AuthGuard } from './auth/auth.guard';
import {UnauthorizedComponent} from "./components/unauthorized/unauthorized.component";
import {RedirectHomeComponent} from "./components/redirect-home/redirect-home.component";


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
        path: '',
        pathMatch: 'full',
        canActivate: [AuthGuard],
        component: RedirectHomeComponent
      },
      {
        path: 'admin',
        component: RouterContainerMagicComponent,
        canActivate: [AuthGuard],
        data: { roles: ['admin'] }
      },
      {
        path: 'unauthorized',
        component: UnauthorizedComponent
      },
      {
        path: 'sales',
        component: RouterContainerMagicComponent,
        canActivate: [AuthGuard],
        data: { roles: ['sales','admin'] }
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
