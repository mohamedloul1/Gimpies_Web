import {
    FormControl,
    FormGroup
} from "@angular/forms";
import {
    MagicServices
} from "@magic-xpa/angular";
export enum MgControlName {
    CreateOrder = "CreateOrder",
        Lb_UserID = "Lb_UserID",
        V_UserID = "V_UserID",
        Lb_ShoID = "Lb_ShoID",
        V_ShoeID = "V_ShoeID",
        Lb_Amount = "Lb_Amount",
        V_V_Amount = "V_V_Amount",
        Lb_OrderType = "Lb_OrderType",
        V_V_OrderType = "V_V_OrderType",
        Btn_CreateOrder = "Btn_CreateOrder",
}
export enum MgCustomProperties {}
export class MgFormControlsAccessor {
    constructor(private fg: FormGroup, private magicServices: MagicServices) {}

    get V_UserID(): FormControl {
        return this.fg.controls[MgControlName.V_UserID] as FormControl;
    }

    get V_ShoeID(): FormControl {
        return this.fg.controls[MgControlName.V_ShoeID] as FormControl;
    }

    get V_V_Amount(): FormControl {
        return this.fg.controls[MgControlName.V_V_Amount] as FormControl;
    }

    get V_V_OrderType(): FormControl {
        return this.fg.controls[MgControlName.V_V_OrderType] as FormControl;
    }

    getTableChildFormControl(name: MgControlName): FormControl {
        return this.magicServices.mgAccessorService.getFormGroupByRow(this.magicServices.tableService.getSelectedRow()).controls[name] as FormControl;
    }
}