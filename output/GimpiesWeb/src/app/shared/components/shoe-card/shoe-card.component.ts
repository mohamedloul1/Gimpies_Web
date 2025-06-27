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


  @Output() toggle = new EventEmitter<number>();
  @Output() imageClick = new EventEmitter<string>();

  onCardClick(): void {
    this.toggle.emit(this.shoe.ShoeID);
  }

  onImageClick(event: MouseEvent): void {
    event.stopPropagation();
    this.imageClick.emit(this.shoe.imageUrl);
  }
}
