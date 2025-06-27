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
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import {MatCardModule} from "@angular/material/card";
import { MatButtonModule } from '@angular/material/button';
import { RedirectHomeComponent } from './components/redirect-home/redirect-home.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import { MatSliderModule } from '@angular/material/slider';
import { ShoeCardModule } from './shared/components/shoe-card/shoe-card.module';







@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    LayoutComponent,
    SessionBridgeComponent,
    ConfirmDialogComponent,
    UnauthorizedComponent,
    RedirectHomeComponent
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
    MatCardModule,
    MatButtonModule,
    MatTooltipModule,
    MatSliderModule,
    ShoeCardModule


  ],
  providers: [{ provide: MagicLazyLoaderService, useClass: LazyLoaderService }],
  bootstrap: [AppComponent]
})
export class AppModule { }
