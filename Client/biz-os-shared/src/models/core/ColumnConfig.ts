export interface ColumnConfig {
    header: string;
    columnName: string;
    dataType?: string;
    formatter?: (rowData: any) => string;
    sortable?: boolean;
    sortOrder?: 'asc' | 'desc';
    width?: number;
    align?: string;
}