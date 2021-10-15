import { FormControl, ValidatorFn } from '@angular/forms';


export function amountlValidator(min: number, max: number): ValidatorFn {
    return (c: FormControl): { [key: string]: any } => {
        if (c.value < min || c.value > max) {

            return { 'amountlValidator': true };
        } else {
            return null;
        }
    };
}
