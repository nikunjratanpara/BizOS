
import { Observable } from 'rxjs';
import { CatalogData } from '../../models/core/CatalogData';
import { CatalogRequest } from "../models/CatalogRequest";

export interface IDataComboService {
    getCatalogData(catalogFilter: CatalogRequest): Observable<CatalogData[]>;
}
