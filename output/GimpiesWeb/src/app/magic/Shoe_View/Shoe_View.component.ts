import {ChangeDetectorRef, Component} from '@angular/core';
import { FormGroup } from "@angular/forms";
import { MgFormControlsAccessor, MgControlName, MgCustomProperties } from "./Shoe_View.mg.controls.g";
import { Shoe } from '../../models/shoe.model';
import {TaskBaseMagicComponent, magicProviders, MagicServices} from "@magic-xpa/angular";
import {Router} from "@angular/router";
import {UserSessionService} from "../../services/user-session.service";


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

  Shoe_Data: any[] = [];
  selectedImage: string | null = null;
  searchTerm: string = '';



  constructor(ref: ChangeDetectorRef, magicServices: MagicServices, private router: Router,private sessionService: UserSessionService) {
    super(ref, magicServices);
  }

  override createFormControlsAccessor(formGroup: FormGroup) {
        this.mgfc = new MgFormControlsAccessor(formGroup, this.magicServices);
    }
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

      console.log("✅ Shoes met ImageUrl:", this.Shoe_Data);
    } catch (e) {
      console.error("JSON parse error:", e);
    }
  }

  openImage(imageUrl: string): void {
    this.selectedImage = imageUrl;
  }

  closeImage(): void {
    this.selectedImage = null;
  }
  get filteredShoes() {
    if (!this.searchTerm) return this.Shoe_Data;

    const terms = this.searchTerm.toLowerCase().split(' ').filter(t => t);

    return this.Shoe_Data.filter(shoe => {
      const combined = [
        shoe.Brand_Name,
        shoe.Type_Name,
        shoe.Color_Name
      ].join(' ').toLowerCase();

      return terms.every(term => combined.includes(term));
    });
  }

}
