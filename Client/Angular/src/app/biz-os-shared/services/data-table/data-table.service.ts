import { Observable, of } from 'rxjs';
import { IDataTableService } from './data.table.service.interface';
import { BaseService } from '../base.service';
import { catchError } from 'rxjs/operators';
import { DataSource } from "../../models/core/DataSource";
import { GridOutcome } from "../../models/core/GridOutcome";
import { DataTableConfig } from "../../models/core/DataTableConfig";
import { HttpRequest } from '../../models/core/HttpRequest';

export class DataTableService extends BaseService implements IDataTableService {

  constructor() {
    super('DynamicGrid');
  }
  getSourceObservable(sourceConfiguration: DataSource): Observable<GridOutcome> {
      return this.getData(sourceConfiguration);
  }
  getGridConfig(gridConfigId: string): Observable<DataTableConfig> {
    return this.httpClientService.get<DataTableConfig>({url: this.getUrl(gridConfigId)}).pipe(catchError(this.handleError));
  }
  private getData(sourceConfiguration: DataSource): Observable<GridOutcome> {
    if (sourceConfiguration) {
     const requestConfig: HttpRequest = {
        url : this.appendBaseUrl(sourceConfiguration.url),
        body: sourceConfiguration.requestPayload,
        method: sourceConfiguration.method
      };
      return this.httpClientService.request<GridOutcome>(requestConfig)
      .pipe(catchError(this.handleError));
    } else {
      return of<GridOutcome>();
    }
  }
}
