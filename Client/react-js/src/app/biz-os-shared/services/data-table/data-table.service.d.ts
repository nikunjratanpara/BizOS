import { Observable } from 'rxjs';
import { IDataTableService } from './data.table.service.interface';
import { BaseService } from '../base.service';
import { DataSource } from "../../models/core/DataSource";
import { GridOutcome } from "../../models/core/GridOutcome";
import { DataTableConfig } from "../../models/core/DataTableConfig";
export declare class DataTableService extends BaseService implements IDataTableService {
    constructor();
    getSourceObservable(sourceConfiguration: DataSource): Observable<GridOutcome>;
    getGridConfig(gridConfigId: string): Observable<DataTableConfig>;
    private getData;
}
