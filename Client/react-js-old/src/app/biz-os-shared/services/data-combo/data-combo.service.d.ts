import { Observable } from 'rxjs';
import { CatalogRequest } from "../models/CatalogRequest";
import { BaseService } from '../base.service';
import { CatalogData } from '../../models/core/CatalogData';
import { IDataComboService } from './data.combo.service.interface';
export declare class DataComboService extends BaseService implements IDataComboService {
    constructor();
    getCatalogData(catalogFilter: CatalogRequest): Observable<CatalogData[]>;
}
