import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-shoe-card',
  templateUrl: './shoe-card.component.html',
  styleUrls: ['./shoe-card.component.scss']
})
export class ShoeCardComponent {
  @Input() shoe!: any; // eventueel met een Shoe-interface
  selectedImage: string | null = null;

  openImage(imageUrl: string | undefined): void {
    this.selectedImage = imageUrl ?? null;
  }

  closeImage(): void {
    this.selectedImage = null;
  }
}
