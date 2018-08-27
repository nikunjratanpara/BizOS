import { DataGridColumn } from "./DataGridColumn";
import { DataSource } from "./DataSource";
export interface DataGridSetting {
    columns?: Array<DataGridColumn>;
    source?: DataSource;
    pageSize?: number;
}