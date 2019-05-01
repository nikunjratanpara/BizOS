
import { BaseService } from '../base.service';
import { DynamicViewConfig } from '../../models/core/DynamicViewConfig';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
export class DynamicViewService extends BaseService {
  constructor() {
    super('DynamicView');
  }
  public getViewConfig(formName: string): Observable<DynamicViewConfig> {
    return this.httpClientService.get<DynamicViewConfig>({url: this.getUrl(formName)}).pipe(catchError(this.handleError));
  }
}
