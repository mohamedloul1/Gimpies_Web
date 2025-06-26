import {
    FormControl,
    FormGroup
} from "@angular/forms";
import {
    MagicServices
} from "@magic-xpa/angular";
export enum MgControlName {
    CreateOrder = "CreateOrder",
        Label134217739 = "Label134217739",
        V_OrderID = "V_OrderID",
        Label134217741 = "Label134217741",
        V_UserID = "V_UserID",
        Label134217743 = "Label134217743",
        V_ShoeID = "V_ShoeID",
        Btn_CreateOrder = "Btn_CreateOrder",
}
export enum MgCustomProperties {}
export class MgFormControlsAccessor {
    constructor(private fg: FormGroup, private magicServices: MagicServices) {}

    get V_OrderID(): FormControl {
        return this.fg.controls[MgControlName.V_OrderID] as FormControl;
    }

    get V_UserID(): FormControl {
        return this.fg.controls[MgControlName.V_UserID] as FormControl;
    }

    get V_ShoeID(): FormControl {
        return this.fg.controls[MgControlName.V_ShoeID] as FormControl;
    }

    getTableChildFormControl(name: MgControlName): FormControl {
        return this.magicServices.mgAccessorService.getFormGroupByRow(this.magicServices.tableService.getSelectedRow()).controls[name] as FormControl;
    }
}