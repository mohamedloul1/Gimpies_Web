import { Component } from '@angular/core';

import { FormGroup } from "@angular/forms";
import { MgFormControlsAccessor, MgControlName, MgCustomProperties } from "./Admin.mg.controls.g";


import { TaskBaseMagicComponent, magicProviders } from "@magic-xpa/angular";


@Component({
    selector: 'mga-Admin',
    providers: [...magicProviders],
    templateUrl: './Admin.component.html'
})
export class Admin extends TaskBaseMagicComponent {

    mgc = MgControlName;
    mgcp = MgCustomProperties;
    mgfc!: MgFormControlsAccessor;
    override createFormControlsAccessor(formGroup: FormGroup) {
        this.mgfc = new MgFormControlsAccessor(formGroup, this.magicServices);
    }


    userName : string = this.mg.GetCookie('userName');
    userRole: string = this.mg.GetCookie('userRole');

  get vTestValue(): string {
    return this.mgfc?.V_test?.value;
  }

}
