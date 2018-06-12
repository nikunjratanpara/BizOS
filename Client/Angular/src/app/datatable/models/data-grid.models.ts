import { IPagination } from '../../controls/components/data-table/models/IPagination';
export interface IDataGridSettings {
    columns?: Array<IDataGridColumn>;
    source?: IDataSource;
    pageSize?: number;
}
export interface IGridOutcome {
    totalRecords: number;
    pageNo: number;
    resultSet: any[];
}
export interface IPaginationSettings {
    pageNo: number;
    pageSize: number;
    orderBy?: string;
}
export interface IGridDataRequest extends IPaginationSettings {
    parameters?: any;
}
export interface IDataSource {
    url: string;
    method: string;
    requestPayload: IGridDataRequest;
}
export interface IDataGridColumn {
    dataField: string;
    header: string;
    groupHeader: string;
    width?: number;
    template?: string;
    align?: string;
    formatter?: string;
    formatOptions?: FormattersLocaleOptions;
    dataType?: string;
    sortable?: boolean;
    sortOrder?: 'asc'|'desc';
    searchable?: boolean;
    searchType: string;
    searchConfig: any;
}
export interface FormatterIntegerLocaleOptions {
    thousandsSeparator?: string;
    defaultValue?: string;
}
export interface IGroupHeaderConfig {
    header: string;
    colSpan: number;
}
export interface FormatterNumberLocaleOptions extends FormatterIntegerLocaleOptions {
    decimalSeparator?: string;
    decimalPlaces?: number;
}
export interface FormatterCurrencyLocaleOptions extends FormatterNumberLocaleOptions {
    prefix?: string;
    suffix?: string;
}
export interface FormatterDateLocaleOptions {
    dayNames?: string[];
    monthNames?: string[];
    AmPm?: string[];
    S?: (j: number) => string;
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
export interface FormattersLocaleOptions {
    integer?: FormatterIntegerLocaleOptions;
    number?: FormatterNumberLocaleOptions;
    currency?: FormatterCurrencyLocaleOptions;
    date?: FormatterDateLocaleOptions;
    [propName: string]: any;
}
