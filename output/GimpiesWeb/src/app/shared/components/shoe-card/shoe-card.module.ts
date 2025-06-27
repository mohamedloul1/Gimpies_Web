import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoeCardComponent } from './shoe-card.component';

@NgModule({
  declarations: [ShoeCardComponent],
  imports: [CommonModule],
  exports: [ShoeCardComponent]
})
export class ShoeCardModule {}
