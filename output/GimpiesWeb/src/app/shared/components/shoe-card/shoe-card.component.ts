import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Shoe } from '../../../models/shoe.model';

@Component({
  selector: 'app-shoe-card',
  templateUrl: './shoe-card.component.html',
  styleUrls: ['./shoe-card.component.scss']
})

export class ShoeCardComponent {
  @Input() shoe!: Shoe;
  @Input() selected: boolean = false;
  @Input() readonly: boolean = false;
  @Input() amount: number = 1;
  @Input() removable: boolean = false;



  @Output() toggle = new EventEmitter<number>();
  @Output() imageClick = new EventEmitter<string>();
  @Output() amountChange = new EventEmitter<number>();
  @Output() remove = new EventEmitter<void>();



  onCardClick(): void {
    this.toggle.emit(this.shoe.ShoeID);
  }

  onImageClick(event: MouseEvent): void {
    event.stopPropagation();
    this.imageClick.emit(this.shoe.imageUrl);
  }

  increase(event: Event): void {
    event.stopPropagation();
    if (this.amount < this.shoe.Quantity) {
      this.amount++;
    }
  }

  decrease(event: Event): void {
    event.stopPropagation();
    if (this.amount > 1) {
      this.amount--;
    }
  }
  onRemove(event: MouseEvent) {
    event.stopPropagation();
    this.remove.emit();
  }
  onAmountInput(event: Event): void {
    event.stopPropagation();
    const input = (event.target as HTMLInputElement).value;
    let parsed = parseInt(input, 10);

    if (isNaN(parsed) || parsed < 1) {
      parsed = 1;
    } else if (parsed > this.shoe.Quantity) {
      parsed = this.shoe.Quantity;
    }

    this.amount = parsed;
  }

}
