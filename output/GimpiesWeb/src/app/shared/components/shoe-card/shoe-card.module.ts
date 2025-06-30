import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoeCardComponent } from './shoe-card.component';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  declarations: [ShoeCardComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule],
  exports: [ShoeCardComponent]
})
export class ShoeCardModule {}
