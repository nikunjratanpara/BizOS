import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IDataTableService } from './data.table.service.interface';
import { BaseService } from '../base.service';
import { IDataTableConfig } from '../../components/data-table/models/dataTableConfig.model';
import { IDataSource, IGridOutcome } from '../../../datatable/models/data-grid.models';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable()
export class DataTableService extends BaseService implements IDataTableService {

  constructor(private httpClient: HttpClient) {
    super('DynamicGrid');
  }
  getSourceObservable(sourceConfiguration: IDataSource): Observable<IGridOutcome> {
      return this.getData(sourceConfiguration);
  }
  getGridConfig(gridConfigId: string): Observable<IDataTableConfig> {
    return this.httpClient.get<IDataTableConfig>(this.getUrl(gridConfigId)).pipe(catchError(this.handleError));
  }
  private getData(sourceConfiguration: IDataSource): Observable<IGridOutcome> {
    if (sourceConfiguration) {
      const requestPayload = {
        body: sourceConfiguration.requestPayload
      };
      return this.httpClient.request<IGridOutcome>(sourceConfiguration.method, this.appendBaseUrl(sourceConfiguration.url), requestPayload)
      .pipe(catchError(this.handleError));
    } else {
      return of<IGridOutcome>();
    }
  }
}
