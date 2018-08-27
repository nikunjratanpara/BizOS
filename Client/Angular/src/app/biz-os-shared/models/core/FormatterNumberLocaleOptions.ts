import { FormatterIntegerLocaleOptions } from "./FormatterIntegerLocaleOptions";
export interface FormatterNumberLocaleOptions extends FormatterIntegerLocaleOptions {
    decimalSeparator?: string;
    decimalPlaces?: number;
}