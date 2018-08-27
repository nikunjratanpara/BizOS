import { IColModel } from './IColModel';
import { ISourceConfiguration } from './ISourceConfiguration';
import { FormConfig } from '../../../../biz-os-shared';
export interface IDataTableConfig {
    cols: Array<IColModel>;
    source: ISourceConfiguration;
    pageSize: number;
    searchConfig?: FormConfig;
}
export interface IColumnConfig {
    header: string;
    columnName: string;
    dataType?: string;
    formatter?: (rowData: any) => string;
    sortable?: boolean;
    sortOrder?: 'asc'|'desc';
    width?: number;
    align?: string;
}
export interface IDataRequestModel {
    pageNo: number;
    pageSize: number;
    search: any;
    sort?: string;
    sortOrder?: string;
}
