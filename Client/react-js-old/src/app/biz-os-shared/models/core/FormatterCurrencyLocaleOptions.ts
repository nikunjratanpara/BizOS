import { FormatterNumberLocaleOptions } from "./FormatterNumberLocaleOptions";
export interface FormatterCurrencyLocaleOptions extends FormatterNumberLocaleOptions {
    prefix?: string;
    suffix?: string;
}