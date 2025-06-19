import {ChangeDetectorRef, Component} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {MgFormControlsAccessor, MgControlName, MgCustomProperties} from "./Admin.mg.controls.g";
import {TaskBaseMagicComponent, magicProviders, MagicServices} from "@magic-xpa/angular";

@Component({
  selector: 'mga-Admin',
  providers: [...magicProviders],
  templateUrl: './Admin.component.html'
})
export class Admin extends TaskBaseMagicComponent {

  mgc = MgControlName;
  mgcp = MgCustomProperties;
  mgfc!: MgFormControlsAccessor;

  constructor(
    public override ref: ChangeDetectorRef,
    public override magicServices: MagicServices
  ) {
    super(ref, magicServices);
  }

  override createFormControlsAccessor(formGroup: FormGroup) {
    this.mgfc = new MgFormControlsAccessor(formGroup, this.magicServices);
  }
  //Test Functie Get value from xpa
  get vTestValue(): string {
    return this.mgfc?.V_test?.value;
  }
}
