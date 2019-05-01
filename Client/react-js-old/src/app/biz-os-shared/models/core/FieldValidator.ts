import { minDate, maxDate, maxNumber, minNumber, required, pattern } from './consts';

export interface FieldValidator {
    validationType: typeof minDate | typeof maxDate | typeof maxNumber | typeof minNumber | typeof required | typeof pattern;
    validateWith: string | number | RegExp;
}