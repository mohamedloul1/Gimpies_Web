import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {TaskBaseMagicComponent, magicProviders, MagicServices} from '@magic-xpa/angular';
import {UserSessionService} from "../../../services/user-session.service";
@Component({
  selector: 'app-session-bridge',
  template: '',
  providers: [...magicProviders] // ✅ BELANGRIJK
})
export class SessionBridgeComponent extends TaskBaseMagicComponent {

  constructor(
    override readonly ref: ChangeDetectorRef,
    override readonly magicServices: MagicServices,
    private sessionService: UserSessionService
  ) {
    super(ref, magicServices);
  }

  override ngAfterViewInit(): void {
    super.ngAfterViewInit();

    const userName = this.mg.GetCookie('userName');
    const userRole = this.mg.GetCookie('userRole');

    if (userName && userRole) {
      this.sessionService.setSession(userName, userRole);
    }
  }
}
