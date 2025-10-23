import {
    FormControl,
    FormGroup
} from "@angular/forms";
import {
    MagicServices
} from "@magic-xpa/angular";
export enum MgControlName {
    Shoe_View = "Shoe_View",
        Label134217730 = "Label134217730",
        V_V_Test = "V_V_Test",
        Lb_UserID = "Lb_UserID",
        V_V_UserID = "V_V_UserID",
        Lb_ShoeID = "Lb_ShoeID",
        V_V_ShoeID = "V_V_ShoeID",
        Lb_Amount = "Lb_Amount",
        V_V_Amount = "V_V_Amount",
        Lb_OrderTpe = "Lb_OrderTpe",
        V_V_OrderType = "V_V_OrderType",
        Btn_CreateOrder = "Btn_CreateOrder",
        pb_Refresh = "pb_Refresh",
}
export enum MgCustomProperties {}
export class MgFormControlsAccessor {
    constructor(private fg: FormGroup, private magicServices: MagicServices) {}

    get V_V_Test(): FormControl {
        return this.fg.controls[MgControlName.V_V_Test] as FormControl;
    }

    get V_V_UserID(): FormControl {
        return this.fg.controls[MgControlName.V_V_UserID] as FormControl;
    }

    get V_V_ShoeID(): FormControl {
        return this.fg.controls[MgControlName.V_V_ShoeID] as FormControl;
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