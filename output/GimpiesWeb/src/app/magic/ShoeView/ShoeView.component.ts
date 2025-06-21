import {ChangeDetectorRef, Component} from '@angular/core';

import {FormGroup} from "@angular/forms";
import {MgFormControlsAccessor, MgControlName, MgCustomProperties} from "./ShoeView.mg.controls.g";


import {TaskBaseMagicComponent, magicProviders, MagicServices} from "@magic-xpa/angular";
import {Router} from "@angular/router";
import {UserSessionService} from "../../services/user-session.service";


@Component({
  selector: 'mga-ShoeView',
  providers: [...magicProviders],
  templateUrl: './ShoeView.component.html'
})
export class ShoeView extends TaskBaseMagicComponent {

  mgc = MgControlName;
  mgcp = MgCustomProperties;
  mgfc!: MgFormControlsAccessor;
  // arrays
  shoeData: any[] = [];

  constructor(ref: ChangeDetectorRef, magicServices: MagicServices, private router: Router,private sessionService: UserSessionService) {
    super(ref, magicServices);
  }

  override createFormControlsAccessor(formGroup: FormGroup) {
    this.mgfc = new MgFormControlsAccessor(formGroup, this.magicServices);
  }

  getShoeData(shoeData: any): void {
    this.shoeData = JSON.parse(shoeData);
    console.log(this.shoeData);
  }
}
