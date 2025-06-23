import {ChangeDetectorRef, Component} from '@angular/core';

import { FormGroup } from "@angular/forms";
import { MgFormControlsAccessor, MgControlName, MgCustomProperties } from "./Shoe_View.mg.controls.g";

import {data} from "autoprefixer";

import {TaskBaseMagicComponent, magicProviders, MagicServices} from "@magic-xpa/angular";
import {Router} from "@angular/router";
import {UserSessionService} from "../../services/user-session.service";


@Component({
    selector: 'mga-Shoe_View',
    providers: [...magicProviders],
    templateUrl: './Shoe_View.component.html'
})
export class Shoe_View extends TaskBaseMagicComponent {

    mgc = MgControlName;
    mgcp = MgCustomProperties;
    mgfc!: MgFormControlsAccessor;

  Shoe_Data: any[] = [];

  constructor(ref: ChangeDetectorRef, magicServices: MagicServices, private router: Router,private sessionService: UserSessionService) {
    super(ref, magicServices);
  }

  override createFormControlsAccessor(formGroup: FormGroup) {
        this.mgfc = new MgFormControlsAccessor(formGroup, this.magicServices);
    }
  getShoeData(Shoe_Data: any): void {
    this.Shoe_Data = JSON.parse(Shoe_Data);
    console.log("from" ,this.Shoe_Data);
  }
}
