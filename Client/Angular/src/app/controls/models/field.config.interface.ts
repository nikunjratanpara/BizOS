import { ValidatorFn } from '@angular/forms';
import { IOption } from './option.interface';
import { ITypeaheadOptions } from './typeaheadOptions.interface';
import { IDatetimePickerOptions } from '../components/ng-datetime/datetime.struct';
import { Observable } from 'rxjs/Observable';
import { DATA_COMBO_CONTROL_VALUE_ACCESSOR } from '../components/form-data-combo/form-data-combo.component';
import { observableToBeFn } from 'rxjs/testing/TestScheduler';
import { extend } from '../utils/util';

export interface IFormConfig {
    formName: string;
    cols?: number;
    operations?: IFormOperations;
    controls: IFieldConfig[];
}
export interface IFormOperations {
    save?: IFormButton;
    update?: IFormButton;
    reset?: IFormButton;
    cancel?: IFormButton;
    delete?: IFormButton;
    search?: IFormButton;
}
export interface IFormButton {
    visible: boolean;
    uiKey: string;
}
export interface IFieldConfig {
    type: string;
    name: string;
    disabled?: boolean;
    label?: string;
    isUpdatable?: boolean;
    options?: IOption[] | string[] ;
    placeholder?: string;
    errors?: IError[];
    validation?: ValidatorFn[];
    customValidation?: ICustomValidations;
    value?: any;
    cssClass?: string;
    typeaheadOptions?: ITypeaheadOptions;
    datetimePickerOptions?: IDatetimePickerOptions;
    validate?: () => Boolean;
    formModel: IFormModel;
}
export const maxDate = 'maxDate';
export const minDate = 'minDate';
export const maxNumber = 'maxNumber';
export const minNumber = 'minNumber';
export const required = 'isRequired';
export const pattern = 'pattren';

export interface ICustomValidations {
    maxDate?: Date;
    minDate?: Date;
    maxNumber?: number;
    minNumber?: number;
    isRequired?: boolean;
    pattern: RegExp;
}
export interface IFieldValidator {
    validationType: typeof minDate | typeof maxDate | typeof maxNumber | typeof minNumber | typeof required | typeof pattern;
    validateWith: string | number | RegExp;
}
export interface IError {
    errorCode: string;
    error: string;
}
export interface IFormModel {
    formMode: FormMode;
    isLocked: boolean;
}
export enum FormMode {
    New,
    Update,
    Search
}
