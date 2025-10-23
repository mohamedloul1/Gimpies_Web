import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Shoe } from '../../../models/shoe.model';

@Component({
  selector: 'app-shoe-card',
  templateUrl: './shoe-card.component.html',
  styleUrls: ['./shoe-card.component.scss']
})

export class ShoeCardComponent {
  //Deze waarden krijg je van de oudercomponent:
  @Input() shoe!: Shoe;
  @Input() selected: boolean = false;
  @Input() readonly: boolean = false;
  @Input() amount: number = 1;
  @Input() removable: boolean = false;


//Deze geven events terug aan de oudercomponent:
  @Output() toggle = new EventEmitter<number>();
  @Output() imageClick = new EventEmitter<string>();
  @Output() amountChange = new EventEmitter<number>();
  @Output() remove = new EventEmitter<void>();


//Methoden

  //➤ Informeert de oudercomponent dat deze schoen geselecteerd of gedeselecteerd is.
  onCardClick(): void {
    this.toggle.emit(this.shoe.ShoeID);
  }
//➤ Opent de afbeelding in een overlay, zonder de kaart te selecteren.
  onImageClick(event: MouseEvent): void {
    event.stopPropagation();
    this.imageClick.emit(this.shoe.imageUrl);
  }
//➤ Verhoogt amount met 1, tenzij maximum (shoe.Quantity) bereikt is.
  increase(event: Event): void {
    event.stopPropagation();
    if (this.amount < this.shoe.Quantity) {
      this.amount++;
      this.amountChange.emit(this.amount); // ✅ verstuur nieuwe amount
    }
  }
//➤ Verlaagt amount met 1, tenzij minimum (1) bereikt is.
  //Beide geven het nieuwe aantal door aan de ouder met
  //this.amountChange.emit(this.amount);
  decrease(event: Event): void {
    event.stopPropagation();
    if (this.amount > 1) {
      this.amount--;
      this.amountChange.emit(this.amount); // ✅ verstuur nieuwe amount
    }
  }
  // Activeert het remove event, zodat oudercomponent deze kaart kan verwijderen.
  onRemove(event: MouseEvent) {
    event.stopPropagation();
    this.remove.emit();
  }
  //Wordt gebruikt als iemand handmatig een getal intypt.
  //
  // Checkt of het ingevoerde getal geldig is
  //
  // Zet het binnen de limieten
  //
  // Stuurt de waarde terug via amountChange.emit(...)
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
    this.amountChange.emit(this.amount); // ✅ verstuur aangepaste amount
  }

}
