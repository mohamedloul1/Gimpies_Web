import {
    FormControl,
    FormGroup
} from "@angular/forms";
import {
    MagicServices
} from "@magic-xpa/angular";
export enum MgControlName {
    Login = "Login",
        Lb_UserName = "Lb_UserName",
        V_UserName = "V_UserName",
        Lb_Password = "Lb_Password",
        V_Password = "V_Password",
        cMessage_Error = "cMessage_Error",
        pb_test = "pb_test",
        Button5 = "Button5",
        V_vPoep = "V_vPoep",
        v_ErrorMessage = "v_ErrorMessage",
}
export enum MgCustomProperties {}
export class MgFormControlsAccessor {
    constructor(private fg: FormGroup, private magicServices: MagicServices) {}

    get V_UserName(): FormControl {
        return this.fg.controls[MgControlName.V_UserName] as FormControl;
    }

    get V_Password(): FormControl {
        return this.fg.controls[MgControlName.V_Password] as FormControl;
    }

    get V_vPoep(): FormControl {
        return this.fg.controls[MgControlName.V_vPoep] as FormControl;
    }

    getTableChildFormControl(name: MgControlName): FormControl {
        return this.magicServices.mgAccessorService.getFormGroupByRow(this.magicServices.tableService.getSelectedRow()).controls[name] as FormControl;
    }
}