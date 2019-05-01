import { DatetimePickerOptions, FormModel, Option, TypeaheadOptions } from '../models';
export interface IBaseControlProps {
    type: "number" | "color" | "password" | "hidden" | "button" | "select" | "textarea" | "time" | "image" | "text" | "reset" | "submit" | "checkbox" | "radio" | "range" | "date" | "file";
    name: string;
    disabled?: boolean;
    label?: string;
    options?: string[] | Option[];
    placeholder?: string;
    value?: string | any;
    checked?: boolean;
    cssClass?: string;
    typeaheadOptions?: TypeaheadOptions;
    datetimePickerOptions?: DatetimePickerOptions;
    formModel?: FormModel;
    width?: number;
    selectOptions?: Option[]
    onChange?: (event: any) => void;
    onSelect?: (event: any) => void;
    onBlur?: (event: any) => void;
    onFocus?: (event: any) => void;
    onInput?: (event: any) => void;
    onKeyDown?: (event: any) => void;
    onKeyPress?: (event: any) => void;
    onKeyUp?: (event: any) => void;
    onClick?: (event: any) => void;
    onDoubleClick?: (event: any) => void;
    onMouseDown?: (event: any) => void;
    onMouseMove?: (event: any) => void;
    onMouseOut?: (event: any) => void;
    onMouseOver?: (event: any) => void;
    onMouseUp?: (event: any) => void;
    onmousewheel?: (event: any) => void;
    onWheel?: (event: any) => void;
}
