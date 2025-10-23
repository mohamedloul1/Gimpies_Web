import { Component, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { MgFormControlsAccessor, MgControlName, MgCustomProperties } from "./LogOut.mg.controls.g";
import { TaskBaseMagicComponent, magicProviders, MagicServices } from "@magic-xpa/angular";
import { UserSessionService } from "../../services/user-session.service";

@Component({
  selector: 'mga-LogOut',
  providers: [...magicProviders],
  templateUrl: './LogOut.component.html'
})
export class LogOut extends TaskBaseMagicComponent {

  mgc = MgControlName;
  mgcp = MgCustomProperties;
  mgfc!: MgFormControlsAccessor;

  constructor(
    ref: ChangeDetectorRef,
    magicServices: MagicServices,
    private userSession: UserSessionService
  ) {
    super(ref, magicServices);
  }

  override createFormControlsAccessor(formGroup: FormGroup) {
    this.mgfc = new MgFormControlsAccessor(formGroup, this.magicServices);
  }

  override ngAfterViewInit(): void {
    // Laat Magic zijn werk eerst doen
    super.ngAfterViewInit();

    // Daarna lees jij de waarde uit het formulier
    const username = this.screenFormGroup.get('V_V_Test')?.value;
    // if (username) {
    //   this.userSession.username = username;
    //   console.log('Gebruikersnaam ingesteld:', username);
    // }
  }
}
