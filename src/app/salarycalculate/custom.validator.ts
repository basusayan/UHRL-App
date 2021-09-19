import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export class CustomValidator{
    static rangeValidator(control:AbstractControl): ValidationErrors | null {
        if(control.value >31){
            return {rangeValidator:true};
        }
        return null;

    }
}

