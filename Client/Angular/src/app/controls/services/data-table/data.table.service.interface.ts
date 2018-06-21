import { IDataRequestModel } from '../../components/data-table/models/dataTableConfig.model';
import { Observable } from 'rxjs';
import { IDataSource, IGridOutcome } from '../../../datatable/models/data-grid.models';
export interface IDataTableService {
    getSourceObservable(sourceConfiguration: IDataSource): Observable<IGridOutcome>;
}
