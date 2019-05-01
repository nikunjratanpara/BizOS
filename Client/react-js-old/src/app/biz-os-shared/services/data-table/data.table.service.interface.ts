import { Observable } from 'rxjs';
import { DataSource } from "../../models/core/DataSource";
import { GridOutcome } from "../../models/core/GridOutcome";
export interface IDataTableService {
    getSourceObservable(sourceConfiguration: DataSource): Observable<GridOutcome>;
}
