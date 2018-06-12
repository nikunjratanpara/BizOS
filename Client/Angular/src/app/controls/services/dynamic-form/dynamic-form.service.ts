import { Injectable } from '@angular/core';
import { extend } from '../../utils/util';
import { BaseService } from '../base.service';
import { RequestOptionsArgs, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IFieldConfig } from '../../models/field.config.interface';
import { IDynamicFormService } from './dynamic.form.service.interface';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DynamicFormService extends BaseService implements IDynamicFormService {

  constructor(private httpClient: HttpClient) {
    super('DynamicForm');
   }
   GetFormConfig(formName: string): Observable<IFieldConfig[]> {
    return this.httpClient.get(this.getUrl(formName)).catch(this.handleError);
   }
   create(formName: string, formData: any ): Observable<boolean> {
     return this.httpClient.post(this.getUrl(formName), formData).catch(this.handleError);
   }
   update(formName: string, formData: any ): Observable<boolean> {
    return this.httpClient.put(this.getUrl(formName), formData).catch(this.handleError);
  }
  delete(formName: string, formData: any ): Observable<boolean> {
    const options = {
      body: formData
    };
    return this.httpClient.request('delete',this.getUrl(formName), options).catch(this.handleError);
  }
}
