import {Observable} from 'rxjs';
import { CatalogRequest } from "../models/CatalogRequest";
import { BaseService } from '../base.service';
import { CatalogData } from '../../models/core/CatalogData';
import { IDataComboService } from './data.combo.service.interface';
import { catchError } from 'rxjs/operators';

export class DataComboService extends BaseService implements IDataComboService {
  constructor() {
    super('Catalog');
  }
  getCatalogData(catalogFilter: CatalogRequest): Observable<CatalogData[]> {
    return this.httpClientService.post<CatalogData[]>({url: this.getUrl(''), body: catalogFilter}).pipe(catchError(this.handleError));
  }
}
