import { ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { MgFormControlsAccessor, MgControlName, MgCustomProperties } from "./Shoe_View.mg.controls.g";
import { Shoe } from '../../models/shoe.model';
import { TaskBaseMagicComponent, magicProviders, MagicServices } from "@magic-xpa/angular";
import { Router } from "@angular/router";
import { UserSessionService } from "../../services/user-session.service";
import { ShoeSelectionService } from '../../services/shoe-selection.service';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'mga-Shoe_View',
  providers: [...magicProviders],
  templateUrl: './Shoe_View.component.html',
  styleUrls: ['./Shoe_View.component.scss']
})
export class Shoe_View extends TaskBaseMagicComponent {

  mgc = MgControlName;
  mgcp = MgCustomProperties;
  mgfc!: MgFormControlsAccessor;

  Shoe_Data: Shoe[] = [];
  selectedShoeIds: number[] = [];
  selectedImage: string | null = null;

  // Nieuw
  selectedShoes: Shoe[] = [];

  showMobileOrderForm: boolean = false;

  searchTerm: string = '';
  selectedBrand: string = '';
  uniqueBrands: string[] = [];
  brandDropdownOpen = false;

  selectedColor: string = '';
  uniqueColors: string[] = [];
  colorDropdownOpen = false;

  maxPrice: number | null = null;
  showCreateOrder = false;

  constructor(
    ref: ChangeDetectorRef,
    magicServices: MagicServices,
    private router: Router,
    private sessionService: UserSessionService,
    private selectionService: ShoeSelectionService,
    private dialog: MatDialog
  ) {
    super(ref, magicServices);
  }

  override createFormControlsAccessor(formGroup: FormGroup) {
    this.mgfc = new MgFormControlsAccessor(formGroup, this.magicServices);
  }

  getShoeData(Shoe_Data: string): void {
    try {
      const parsed = JSON.parse(Shoe_Data);
      this.Shoe_Data = (parsed as any[]).map(item => {
        const type = (item.Type_Name || '').toLowerCase().replace(/\s+/g, '');
        const color = (item.Color_Name || '').toLowerCase().replace(/\s+/g, '');
        const imageUrl = `/assets/images/${type}-${color}.jpg`;

        const restored = this.selectionService.getSelectedShoes();
        const matching = restored.find(s => s.ShoeID === item.ShoeID);

        return {
          ...item,
          imageUrl,
          amount: matching?.amount || 1
        };
      });

      this.extractUniqueBrands();
      this.extractUniqueColors();
    } catch (e) {
      console.error("JSON parse error:", e);
    }
  }

  openImage(imageUrl: string | undefined): void {
    this.selectedImage = imageUrl ?? null;
  }

  closeImage(): void {
    this.selectedImage = null;
  }

  get filteredShoes() {
    const term = this.searchTerm.toLowerCase();
    const terms = term.split(' ').filter(t => t);

    return this.Shoe_Data.filter(shoe => {
      const combined = [shoe.Brand_Name, shoe.Type_Name, shoe.Color_Name].join(' ').toLowerCase();
      const matchesSearch = terms.every(t => combined.includes(t));
      const matchesBrand = this.selectedBrand ? shoe.Brand_Name === this.selectedBrand : true;
      const matchesColor = this.selectedColor ? shoe.Color_Name === this.selectedColor : true;
      const matchesPriceMax = this.maxPrice !== null ? shoe.Price <= this.maxPrice : true;

      return matchesSearch && matchesBrand && matchesColor && matchesPriceMax;
    });
  }

  override ngOnInit(): void {
    super.ngOnInit();
    const restored = this.selectionService.getSelectedShoes();
    this.selectedShoeIds = restored.map(shoe => shoe.ShoeID);
    this.selectedShoes = restored;
  }

  extractUniqueBrands(): void {
    const brands = this.Shoe_Data.map(shoe => shoe.Brand_Name);
    this.uniqueBrands = Array.from(new Set(brands)).sort();
  }

  extractUniqueColors(): void {
    const colors = this.Shoe_Data.map(shoe => shoe.Color_Name);
    this.uniqueColors = Array.from(new Set(colors)).sort();
  }

  toggleBrandDropdown(): void {
    this.brandDropdownOpen = !this.brandDropdownOpen;
  }

  selectBrand(brand: string): void {
    this.selectedBrand = brand;
    this.brandDropdownOpen = false;
  }

  toggleColorDropdown(): void {
    this.colorDropdownOpen = !this.colorDropdownOpen;
  }

  selectColor(color: string): void {
    this.selectedColor = color;
    this.colorDropdownOpen = false;
  }

  toggleSelect(shoeId: number): void {
    const index = this.selectedShoeIds.indexOf(shoeId);

    if (index > -1) {
      this.selectedShoeIds.splice(index, 1);
    } else {
      this.selectedShoeIds.push(shoeId);
    }

    const geselecteerdeSchoenen = this.getSelectedShoes();
    this.selectionService.setSelectedShoes(geselecteerdeSchoenen);
    this.selectedShoes = geselecteerdeSchoenen;
  }

  isSelected(shoeId: number): boolean {
    return this.selectedShoeIds.includes(shoeId);
  }

  getSelectedShoes(): Shoe[] {
    return this.Shoe_Data.filter(shoe => this.selectedShoeIds.includes(shoe.ShoeID));
  }

  ContinueToOrder(): void {
    const geselecteerdeSchoenen = this.getSelectedShoes();
    this.showCreateOrder = true;

    this.selectionService.setSelectedShoes(geselecteerdeSchoenen);
    this.router.navigate(['/create-order']);
  }

  updateAmount(shoeId: number, amount: number): void {
    const found = this.selectedShoes.find(s => s.ShoeID === shoeId);
    if (found) {
      found.amount = amount;
      this.selectionService.setSelectedShoes(this.selectedShoes);
    }
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

  removeShoe(shoeId: number): void {
    this.selectedShoes = this.selectedShoes.filter(shoe => shoe.ShoeID !== shoeId);
    this.selectedShoeIds = this.selectedShoeIds.filter(id => id !== shoeId);
    this.selectionService.setSelectedShoes(this.selectedShoes);
  }
  confirmAndCreateOrder(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      panelClass: 'custom-dialog-container',
      data: {
        title: 'Bestelling plaatsen',
        message: 'Weet je zeker dat je deze bestelling wilt plaatsen?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.createOrderWithLines();
      }
    });
  }


  // 🆕 Nieuw toegevoegd
  createOrderWithLines(): void {
    const userId = this.sessionService.getUserID();
    const userRole = this.sessionService.getUserRole();

    this.selectedShoes.forEach(shoe => {
      const amount = shoe.amount || 1;

      this.mg.setValueToControl(this.mgc.V_V_ShoeID, shoe.ShoeID);
      this.mg.setValueToControl(this.mgc.V_V_Amount, amount);
      this.mg.setValueToControl(this.mgc.V_V_UserID, userId);
      this.mg.setValueToControl(this.mgc.V_V_OrderType, userRole);

      this.mg.simulateClick(this.mgc.Btn_CreateOrder);
    });

    this.selectionService.clear();
    this.selectedShoeIds = [];
    this.selectedShoes = [];
    this.closeMobileOrderForm();
  }

  openMobileOrderForm(): void {
    this.showMobileOrderForm = true;
    document.body.classList.add('overflow-hidden');
  }

  closeMobileOrderForm(): void {
    this.showMobileOrderForm = false;
    document.body.classList.remove('overflow-hidden');
  }


}
