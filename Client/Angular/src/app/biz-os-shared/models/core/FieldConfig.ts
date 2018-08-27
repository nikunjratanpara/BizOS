import { Option } from './Option';
import { TypeaheadOptions } from './typeaheadOptions.interface';
import { DatetimePickerOptions } from './DatetimePickerOptions';
import { FormModel } from "./FormModel";
import { CustomValidations } from "./CustomValidations";
import { Error } from "./Error";
export interface FieldConfig {
    type: string;
    name: string;
    disabled?: boolean;
    label?: string;
    isUpdatable?: boolean;
    options?: Option[] | string[];
    placeholder?: string;
    errors?: Error[];
    customValidation?: CustomValidations;
    value?: any;
    cssClass?: string;
    typeaheadOptions?: TypeaheadOptions;
    datetimePickerOptions?: DatetimePickerOptions;
    validate?: () => Boolean;
    formModel: FormModel;
}