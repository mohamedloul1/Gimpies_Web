import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { MgFormControlsAccessor, MgControlName, MgCustomProperties } from "./CreateOrder.mg.controls.g";
import { Shoe } from '../../models/shoe.model';
import { ShoeSelectionService } from '../../services/shoe-selection.service';
import { TaskBaseMagicComponent, magicProviders, MagicServices } from "@magic-xpa/angular";
import { ShoeCardComponent } from '../../shared/components/shoe-card/shoe-card.component';



@Component({
  selector: 'mga-CreateOrder',
  providers: [...magicProviders],
  templateUrl: './CreateOrder.component.html',
  styleUrls: ['./CreateOrder.component.scss']
})
export class CreateOrder extends TaskBaseMagicComponent implements OnInit {

  mgc = MgControlName;
  mgcp = MgCustomProperties;
  mgfc!: MgFormControlsAccessor;

  selectedShoes: Shoe[] = [];


  //Cared img
  selectedImage: string | null = null;


  constructor(
    ref: ChangeDetectorRef,
    magicServices: MagicServices,
    private selectionService: ShoeSelectionService
  ) {
    super(ref, magicServices);
  }

  override createFormControlsAccessor(formGroup: FormGroup) {
    this.mgfc = new MgFormControlsAccessor(formGroup, this.magicServices);
  }

  override ngOnInit(): void {
    super.ngOnInit();

    //Geselecteerde schoenen ophalen uit service
    this.selectedShoes = this.selectionService.getSelectedShoes();
    console.log("🛒 Ontvangen selectie:", this.selectedShoes);
  }
  openImage(imageUrl: string): void {
    console.log('📸 Image clicked:', imageUrl);
    this.selectedImage = imageUrl;
  }


}
