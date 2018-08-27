import { FormConfig } from "./FormConfig";
import { ColModel } from './ColModel';
import { SourceConfiguration } from './SourceConfiguration';
export interface DataTableConfig {
    cols: Array<ColModel>;
    source: SourceConfiguration;
    pageSize: number;
    searchConfig?: FormConfig;
}