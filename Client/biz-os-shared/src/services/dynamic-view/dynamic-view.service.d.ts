import { BaseService } from '../base.service';
import { DynamicViewConfig } from '../../models/core/DynamicViewConfig';
import { Observable } from 'rxjs';
export declare class DynamicViewService extends BaseService {
    constructor();
    getViewConfig(formName: string): Observable<DynamicViewConfig>;
}
