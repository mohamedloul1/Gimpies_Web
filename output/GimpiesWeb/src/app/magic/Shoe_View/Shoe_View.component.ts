import { ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { MgFormControlsAccessor, MgControlName, MgCustomProperties } from "./Shoe_View.mg.controls.g";
import { Shoe } from '../../models/shoe.model';
import { TaskBaseMagicComponent, magicProviders, MagicServices } from "@magic-xpa/angular";
import { Router } from "@angular/router";
import { UserSessionService } from "../../services/user-session.service";
import { ShoeSelectionService } from '../../services/shoe-selection.service';


@Component({
  selector: 'mga-Shoe_View',
  providers: [...magicProviders],
  templateUrl: './Shoe_View.component.html',
  styleUrls: ['./Shoe_View.component.scss']
})

export class Shoe_View extends TaskBaseMagicComponent {

  // Magic xpa controls
  mgc = MgControlName;
  mgcp = MgCustomProperties;
  mgfc!: MgFormControlsAccessor;

  // Alle schoenen die geladen worden vanuit backend
  Shoe_Data: Shoe[] = [];
  // Alleen de IDs van geselecteerde schoenen
  selectedShoeIds: number[] = [];

  //Voor vergroting van de afbeelding
  selectedImage: string | null = null;

  // Deze variabele bepaalt of het mobiele formulier zichtbaar is
  showMobileOrderForm: boolean = false;

  // Gebruikte filters
  searchTerm: string = '';
  selectedBrand: string = '';
  uniqueBrands: string[] = [];
  brandDropdownOpen = false;

  // Kleurfilter
  selectedColor: string = '';
  uniqueColors: string[] = [];
  colorDropdownOpen = false;

  // prijs range filter
  maxPrice: number | null = null;
 //Booleaanse toggle voor modale order-popup
  showCreateOrder = false;




  constructor(
    ref: ChangeDetectorRef,
    magicServices: MagicServices,
    private router: Router,
    private sessionService: UserSessionService,
    private selectionService: ShoeSelectionService

  ) {
    super(ref, magicServices);
  }

  // Magic xpa formcontrols koppelen
  override createFormControlsAccessor(formGroup: FormGroup) {
    this.mgfc = new MgFormControlsAccessor(formGroup, this.magicServices);
  }
  // Wordt aangeroepen vanuit Magic ([magic]="mgc.Shoe_View")
  //
  // Parseert JSON → vult Shoe_Data
  //
  // Berekent afbeelding URL op basis van type + kleur
  //
  // ✅ Herstelt ook amount van eerder geselecteerde schoenen
  getShoeData(Shoe_Data: string): void {
    try {
      const parsed = JSON.parse(Shoe_Data);
      console.log("RAW parsed data:", parsed);

      this.Shoe_Data = (parsed as any[]).map(item => {
        const type = (item.Type_Name || '').toLowerCase().replace(/\s+/g, '');
        const color = (item.Color_Name || '').toLowerCase().replace(/\s+/g, '');
        const imageUrl = `/assets/images/${type}-${color}.jpg`;

        // ✅ herstel amount uit eerdere selectie
        const restored = this.selectionService.getSelectedShoes();
        const matching = restored.find(s => s.ShoeID === item.ShoeID);

        return {
          ...item,
          imageUrl: imageUrl,
          amount: matching?.amount || 1  // ✅ amount behouden

        };
      });

      // Unieke waarden ophalen voor dropdowns
      this.extractUniqueBrands();
      this.extractUniqueColors();

      console.log("✅ Shoes met ImageUrl:", this.Shoe_Data);
    } catch (e) {
      console.error("JSON parse error:", e);
    }
  }

  // Vergrote afbeelding tonen
  openImage(imageUrl: string | undefined): void {
    this.selectedImage = imageUrl ?? null;
  }

  // Overlay sluiten
  closeImage(): void {
    this.selectedImage = null;
  }

  // Combineer alle actieve filters (tekst, merk, kleur)
  get filteredShoes() {
    const term = this.searchTerm.toLowerCase();
    const terms = term.split(' ').filter(t => t);

    return this.Shoe_Data.filter(shoe => {
      // Tekst zoeken op merk, type, kleur
      const combined = [
        shoe.Brand_Name,
        shoe.Type_Name,
        shoe.Color_Name
      ].join(' ').toLowerCase();

      const matchesSearch = terms.every(t => combined.includes(t));
      const matchesBrand = this.selectedBrand ? shoe.Brand_Name === this.selectedBrand : true;
      const matchesColor = this.selectedColor ? shoe.Color_Name === this.selectedColor : true;
      const matchesPriceMax = this.maxPrice !== null ? shoe.Price <= this.maxPrice : true;



      return matchesSearch && matchesBrand && matchesColor && matchesPriceMax;
    });
  }

  // Start lifecycle (optioneel uitbreidbaar)
  override ngOnInit(): void {
    super.ngOnInit();

    // Herstel selectie-ids uit service
    const restored = this.selectionService.getSelectedShoes();
    this.selectedShoeIds = restored.map(shoe => shoe.ShoeID);

    console.log("🔄 Geselecteerde IDs hersteld:", this.selectedShoeIds);
  }

  // Merken verzamelen voor dropdown
  extractUniqueBrands(): void {
    const brands = this.Shoe_Data.map(shoe => shoe.Brand_Name);
    this.uniqueBrands = Array.from(new Set(brands)).sort();
  }

  //  Kleuren verzamelen voor dropdown
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

  // ️ Custom dropdown toggle
  toggleColorDropdown(): void {
    this.colorDropdownOpen = !this.colorDropdownOpen;
  }

  // Kleur selecteren
  selectColor(color: string): void {
    this.selectedColor = color;
    this.colorDropdownOpen = false;
  }

  toggleSelect(shoeId: number): void {
    const index = this.selectedShoeIds.indexOf(shoeId);

    if (index > -1) {
      // Verwijder uit selectie
      this.selectedShoeIds.splice(index, 1);
    } else {
      // Voeg toe aan selectie
      this.selectedShoeIds.push(shoeId);
    }

    const geselecteerdeSchoenen = this.getSelectedShoes();
    this.selectionService.setSelectedShoes(geselecteerdeSchoenen);

    console.log('✅ Geselecteerd & opgeslagen:', geselecteerdeSchoenen);
  }


  isSelected(shoeId: number): boolean {
    return this.selectedShoeIds.includes(shoeId);
  }

  getSelectedShoes(): Shoe[] {
    return this.Shoe_Data.filter(shoe => this.selectedShoeIds.includes(shoe.ShoeID));
  }

  // Bij klikken op "Maak order"
  ContinueToOrder(): void {
    const geselecteerdeSchoenen = this.getSelectedShoes();
    console.log('Te versturen naar service:', geselecteerdeSchoenen);
    this.showCreateOrder = true;

    this.selectionService.setSelectedShoes(geselecteerdeSchoenen);
    this.router.navigate(['/create-order']);
  }
  // closeCreateOrder(): void {
  //   this.showCreateOrder = false;
  // }
  updateAmount(shoeId: number, amount: number): void {
    const selected = this.getSelectedShoes(); // haalt actuele selectie op
    const found = selected.find(s => s.ShoeID === shoeId);
    if (found) {
      found.amount = amount;
      this.selectionService.setSelectedShoes(selected); // slaat nieuwe selectie op
    }
  }

  // callCreateOrder(){
  //   this.mg.simulateClick(this.mgc.Bt_CreateOrder)
  // }
  // 👇 Wordt aangeroepen bij klikken op het 🛒 icoon
  openMobileOrderForm(): void {
    this.showMobileOrderForm = true;
    // Optioneel: voorkom scrollen op achtergrond
    document.body.classList.add('overflow-hidden');
  }

  // 👇 Wordt aangeroepen bij klikken op de ✕ knop in overlay
  closeMobileOrderForm(): void {
    this.showMobileOrderForm = false;
    document.body.classList.remove('overflow-hidden');
  }




}
