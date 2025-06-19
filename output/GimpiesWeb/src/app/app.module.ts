import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MagicModule, MagicLazyLoaderService } from '@magic-xpa/angular';
import { MagicAngularMaterialModule } from '@magic-xpa/angular-material-core';
import { MagicGenLibModule } from './magic/magic.gen.lib.module';
import { MagicRoutingModule } from './app.routes';
import { LazyLoaderService } from './magic/lazy-loader.service';
import { MatIconModule } from '@angular/material/icon';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { LayoutComponent } from './layout/layout.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import { SessionBridgeComponent } from './shared/components/session-bridge/session-bridge.component';
import { ConfirmDialogComponent } from './shared/components/confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';




@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    LayoutComponent,
    SessionBridgeComponent,
    ConfirmDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MagicModule,
    MagicAngularMaterialModule,
    MagicGenLibModule,
    MagicRoutingModule,
    MatIconModule,
    MatSidenavModule,
    MatDialogModule,

  ],
  providers: [{ provide: MagicLazyLoaderService, useClass: LazyLoaderService }],
  bootstrap: [AppComponent]
})
export class AppModule { }
