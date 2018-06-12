import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IDataTableService } from './data.table.service.interface';
import { BaseService } from '../base.service';
import { IDataTableConfig } from '../../components/data-table/models/dataTableConfig.model';
import { IDataSource, IGridOutcome } from '../../../datatable/models/data-grid.models';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataTableService extends BaseService implements IDataTableService {

  constructor(private httpClient: HttpClient) {
    super('DynamicGrid');
  }
  getSourceObservable(sourceConfiguration: IDataSource): Observable<IGridOutcome> {
      return this.getData(sourceConfiguration);
  }
  getGridConfig(gridConfigId: string): Observable<IDataTableConfig> {
    return this.httpClient.get(this.getUrl(gridConfigId))
    .catch(this.handleError);
  }
  private getData(sourceConfiguration: IDataSource) {
    if (sourceConfiguration) {
      const requestPayload = {
        body: sourceConfiguration.requestPayload
      };
      return this.httpClient.request(sourceConfiguration.method, this.appendBaseUrl(sourceConfiguration.url), requestPayload)
      .catch(this.handleError);
    } else {
      return Observable.of([]);
    }
  }
}
