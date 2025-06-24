import { ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { MgFormControlsAccessor, MgControlName, MgCustomProperties } from "./Shoe_View.mg.controls.g";
import { Shoe } from '../../models/shoe.model';
import { TaskBaseMagicComponent, magicProviders, MagicServices } from "@magic-xpa/angular";
import { Router } from "@angular/router";
import { UserSessionService } from "../../services/user-session.service";

@Component({
  selector: 'mga-Shoe_View',
  providers: [...magicProviders],
  templateUrl: './Shoe_View.component.html',
  styleUrls: ['./Shoe_View.component.scss']
})
export class Shoe_View extends TaskBaseMagicComponent {

  // 🔗 Magic xpa controls
  mgc = MgControlName;
  mgcp = MgCustomProperties;
  mgfc!: MgFormControlsAccessor;

  // 📦 Schoenendata + filters
  Shoe_Data: any[] = [];
  selectedImage: string | null = null;

  // 🔍 Zoekterm
  searchTerm: string = '';

  // 📋 Merkenfilter
  selectedBrand: string = '';
  uniqueBrands: string[] = [];
  brandDropdownOpen = false;


  // 🎨 Kleurfilter
  selectedColor: string = '';
  uniqueColors: string[] = [];
  colorDropdownOpen = false;

  //prijs range filter
  maxPrice: number | null = null;



  constructor(
    ref: ChangeDetectorRef,
    magicServices: MagicServices,
    private router: Router,
    private sessionService: UserSessionService
  ) {
    super(ref, magicServices);
  }

  // 🔧 Magic xpa formcontrols koppelen
  override createFormControlsAccessor(formGroup: FormGroup) {
    this.mgfc = new MgFormControlsAccessor(formGroup, this.magicServices);
  }

  // 📥 Schoenendata binnenhalen en verrijken met afbeelding + unieke filters
  getShoeData(Shoe_Data: string): void {
    try {
      const parsed = JSON.parse(Shoe_Data);
      console.log("RAW parsed data:", parsed);

      this.Shoe_Data = (parsed as any[]).map(item => {
        const type = (item.Type_Name || '').toLowerCase().replace(/\s+/g, '');
        const color = (item.Color_Name || '').toLowerCase().replace(/\s+/g, '');
        const imageUrl = `/assets/images/${type}-${color}.jpg`;

        return {
          ...item,
          ImageUrl: imageUrl
        };
      });

      // 🔄 Unieke waarden ophalen voor dropdowns
      this.extractUniqueBrands();
      this.extractUniqueColors();

      console.log("✅ Shoes met ImageUrl:", this.Shoe_Data);
    } catch (e) {
      console.error("JSON parse error:", e);
    }
  }

  // 🔍 Vergrote afbeelding tonen
  openImage(imageUrl: string): void {
    this.selectedImage = imageUrl;
  }

  // ❌ Overlay sluiten
  closeImage(): void {
    this.selectedImage = null;
  }

  // 🔍 Combineer alle actieve filters (tekst, merk, kleur)
  get filteredShoes() {
    const term = this.searchTerm.toLowerCase();
    const terms = term.split(' ').filter(t => t);

    return this.Shoe_Data.filter(shoe => {
      // 🔤 Tekst zoeken op merk, type, kleur
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

  // 🚀 Start lifecycle (optioneel uitbreidbaar)
  override ngOnInit(): void {
    super.ngOnInit(); // Belangrijk voor Magic xpa
  }

  // 📋 Merken verzamelen voor dropdown
  extractUniqueBrands(): void {
    const brands = this.Shoe_Data.map(shoe => shoe.Brand_Name);
    this.uniqueBrands = Array.from(new Set(brands)).sort();
  }

  // 🎨 Kleuren verzamelen voor dropdown
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

  // 🎛️ Custom dropdown toggle
  toggleColorDropdown(): void {
    this.colorDropdownOpen = !this.colorDropdownOpen;
  }

  // 🎯 Kleur selecteren
  selectColor(color: string): void {
    this.selectedColor = color;
    this.colorDropdownOpen = false;
  }
}
