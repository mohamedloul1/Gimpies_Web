import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Shoe } from '../../../models/shoe.model';
import {MatIconModule} from "@angular/material/icon";


@Component({
  selector: 'app-shoe-mini-card',
  templateUrl: './shoe-mini-card.component.html',
  styleUrls: ['./shoe-mini-card.component.scss']
})
export class ShoeMiniCardComponent {
  @Input() shoe!: Shoe;
  @Input() removable: boolean = true;
  @Input() readonly: boolean = false;

  @Output() remove = new EventEmitter<void>();
  @Output() amountChanged = new EventEmitter<number>();

  increase(event: Event) {
    event.stopPropagation();
    this.shoe.amount = (this.shoe.amount || 1) + 1;
    this.amountChanged.emit(this.shoe.amount);
  }

  decrease(event: Event) {
    event.stopPropagation();
    if ((this.shoe.amount || 1) > 1) {
      this.shoe.amount!--;
      this.amountChanged.emit(this.shoe.amount);
    }
  }

  onAmountInput(event: Event) {
    const value = parseInt((event.target as HTMLInputElement).value, 10);
    this.shoe.amount = isNaN(value) ? 1 : Math.max(1, value);
    this.amountChanged.emit(this.shoe.amount);
  }
}
