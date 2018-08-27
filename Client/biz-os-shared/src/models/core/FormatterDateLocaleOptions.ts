export interface FormatterDateLocaleOptions {
    dayNames?: string[];
    monthNames?: string[];
    AmPm?: string[];
    srcformat?: string;
    newformat?: string;
    masks?: {
        ShortDate?: string;
        LongDate?: string;
        FullDateTime?: string;
        MonthDay?: string;
        ShortTime?: string;
        LongTime?: string;
        YearMonth?: string;
    };
}