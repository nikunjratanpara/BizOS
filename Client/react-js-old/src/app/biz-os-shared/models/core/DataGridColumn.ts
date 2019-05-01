import { FormattersLocaleOptions } from "./FormattersLocaleOptions";
export interface DataGridColumn {
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
    sortOrder?: 'asc' | 'desc';
    searchable?: boolean;
    searchType: string;
    searchConfig: any;
}