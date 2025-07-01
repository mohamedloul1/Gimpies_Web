import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { MgFormControlsAccessor, MgControlName, MgCustomProperties } from "./CreateOrder.mg.controls.g";
import { Shoe } from '../../models/shoe.model';
import { ShoeSelectionService } from '../../services/shoe-selection.service';
import { TaskBaseMagicComponent, magicProviders, MagicServices } from "@magic-xpa/angular";
import { ShoeCardComponent } from '../../shared/components/shoe-card/shoe-card.component';
import {ConfirmDialogComponent} from "../../shared/components/confirm-dialog/confirm-dialog.component";
import {MatDialog} from '@angular/material/dialog';
import {UserSessionService} from "../../services/user-session.service";
import { ElementRef, ViewChild } from '@angular/core';


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

  @ViewChild('magicCreateBtn', { static: false })
  magicCreateBtn!: ElementRef<HTMLButtonElement>;

  constructor(
    ref: ChangeDetectorRef,
    magicServices: MagicServices,
    private selectionService: ShoeSelectionService,
    private dialog: MatDialog,
    private userSessionService: UserSessionService,

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

  updateAmount(shoeId: number, newAmount: number): void {
    const found = this.selectedShoes.find(s => s.ShoeID === shoeId);
    if (found) {
      found.amount = newAmount;
      this.selectionService.setSelectedShoes(this.selectedShoes);
    }
  }

  removeShoe(shoeId: number): void {
    this.selectedShoes = this.selectedShoes.filter(shoe => shoe.ShoeID !== shoeId);
    this.selectionService.setSelectedShoes(this.selectedShoes);
  }

  confirmAndRemove(shoeId: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      panelClass: 'custom-dialog-container',
      data: {
        title: 'Schoen verwijderen',
        message: 'Weet je zeker dat je deze schoen uit de selectie wilt verwijderen?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.removeShoe(shoeId);
      }
    });
  }



  createOrderWithLines(): void {
    this.selectedShoes.forEach(shoe => {
      this.createOrderLine(shoe.ShoeID, shoe.amount || 1);
    });

    this.resetFormAfterCreate();
  }


  createOrderLine(shoeId: number, amount: number): void {
    const userId = this.userSessionService.getUserID();
    const userRol = this.userSessionService.getUserRole();

    // console.log('userid is', userId, "rol is", userRol)
    this.mg.setValueToControl(this.mgc.V_ShoeID, shoeId);
    this.mg.setValueToControl(this.mgc.V_V_Amount, amount);
    this.mg.setValueToControl(this.mgc.V_UserID, userId);
    this.mg.setValueToControl(this.mgc.V_V_OrderType, userRol);

    this.mg.simulateClick(this.mgc.Btn_CreateOrder);
  }

  resetFormAfterCreate(): void {
    this.selectionService.clear();
    this.selectedShoes = [];
  }







}
