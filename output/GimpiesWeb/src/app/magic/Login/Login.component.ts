import {ChangeDetectorRef, Component} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {MgFormControlsAccessor, MgControlName, MgCustomProperties} from "./Login.mg.controls.g";
import {TaskBaseMagicComponent, magicProviders, MagicServices} from "@magic-xpa/angular";
import {data} from "autoprefixer";
import {Router} from "@angular/router";
import { UserSessionService } from '../../services/user-session.service';



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

  data: any[] = [];
  dataUser: any[] = [];
  showPassword: boolean = false;


  constructor(ref: ChangeDetectorRef, magicServices: MagicServices, private router: Router,private sessionService: UserSessionService) {
    super(ref, magicServices);
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  override createFormControlsAccessor(formGroup: FormGroup) {
    this.mgfc = new MgFormControlsAccessor(formGroup, this.magicServices);
  }

  getData(data: string): void {
    this.data = JSON.parse(data);
    console.log( this.data);
  }

  userData(dataUser: string): void {
    this.dataUser = JSON.parse(dataUser);
    console.log('dit is array van G', this.dataUser);
  }

  succesFullLogin(userRole: string, userName: string): void {
    const expiryDate: Date = new Date();
    expiryDate.setTime(expiryDate.getTime() + 1000 * 60 * 30);
    // Cookies voor Magic
    this.mg.SetCookie('userRole', userRole, expiryDate);
    this.mg.SetCookie('userName', userName, expiryDate);
    // Sessie voor Angular
    this.sessionService.setSession(userName, userRole);
    // Navigatie
    this.sessionService.redirectToHome()
  }

  testFunction(): void {
    this.mg.setValueToControl(this.mgc.V_vPoep, 'Dit stinkt');
    this.mg.simulateClick(this.mgc.pb_test);
  }

  triggerRoute(): void {
    console.log(" test");
    this.mg.simulateClick(this.mgc.pb_TriggerRoute);
  }

}
