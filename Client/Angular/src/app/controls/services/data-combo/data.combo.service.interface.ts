
import { Observable } from 'rxjs';
import { ICatalogData } from '../../models/catalog.data.interface';
import { ICatalogRequest } from '../models/catalog.filter.interface';

export interface IDataComboService {
    getCatalogData(catalogFilter: ICatalogRequest): Observable<ICatalogData[]>;
}
