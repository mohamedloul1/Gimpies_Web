import { Component } from '@angular/core';

import { FormGroup } from "@angular/forms";
import { MgFormControlsAccessor, MgControlName, MgCustomProperties } from "./Login.mg.controls.g";


import { TaskBaseMagicComponent, magicProviders } from "@magic-xpa/angular";


@Component({
    selector: 'mga-Login',
    providers: [...magicProviders],
    templateUrl: './Login.component.html',
    styleUrls: ['./Login.component.scss']
})
export class Login extends TaskBaseMagicComponent {

    mgc = MgControlName;
    mgcp = MgCustomProperties;
    mgfc!: MgFormControlsAccessor;
  // ✅ Voeg dit toe
  data: any[] = [];
  showPassword: boolean = false;

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
    override createFormControlsAccessor(formGroup: FormGroup) {
        this.mgfc = new MgFormControlsAccessor(formGroup, this.magicServices);
    }

    getData(data: string):void {
      this.data = JSON.parse(data);
      console.log(this.data);
    }

    testFunction():void {
      this.mg.setValueToControl(this.mgc.V_vPoep, 'Dit stinkt');
      this.mg.simulateClick(this.mgc.pb_test);
    }
}
