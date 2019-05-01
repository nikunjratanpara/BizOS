import { FormatterDateLocaleOptions } from "./FormatterDateLocaleOptions";
import { FormatterCurrencyLocaleOptions } from "./FormatterCurrencyLocaleOptions";
import { FormatterNumberLocaleOptions } from "./FormatterNumberLocaleOptions";
import { FormatterIntegerLocaleOptions } from "./FormatterIntegerLocaleOptions";
export interface FormattersLocaleOptions {
    integer?: FormatterIntegerLocaleOptions;
    number?: FormatterNumberLocaleOptions;
    currency?: FormatterCurrencyLocaleOptions;
    date?: FormatterDateLocaleOptions;
    [propName: string]: any;
}