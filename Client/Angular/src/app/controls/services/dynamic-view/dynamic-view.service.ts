import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { DynamicViewConfig } from '../../models/dynamic.view.config';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
@Injectable()
export class DynamicViewService extends BaseService {

  constructor(private httpClient: HttpClient) {
    super('DynamicView');
  }
  public getViewConfig(formName: string): Observable<DynamicViewConfig> {
    return this.httpClient.get<DynamicViewConfig>(this.getUrl(formName)).pipe(catchError(this.handleError));
  }
}
