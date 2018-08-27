
export interface CustomValidations {
    maxDate?: Date;
    minDate?: Date;
    maxNumber?: number;
    minNumber?: number;
    isRequired?: boolean;
    pattern: RegExp;
}