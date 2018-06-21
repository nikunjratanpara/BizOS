import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { Observable } from 'rxjs';
import { IFieldConfig } from '../../models/field.config.interface';
import { IDynamicFormService } from './dynamic.form.service.interface';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable()
export class DynamicFormService extends BaseService implements IDynamicFormService {

  constructor(private httpClient: HttpClient) {
    super('DynamicForm');
   }
   GetFormConfig(formName: string): Observable<IFieldConfig[]> {
    return this.httpClient.get<IFieldConfig[]>(this.getUrl(formName)).pipe(catchError(this.handleError));
   }
   create(formName: string, formData: any ): Observable<boolean> {
     return this.httpClient.post<boolean>(this.getUrl(formName), formData).pipe(catchError(this.handleError));
   }
   update(formName: string, formData: any ): Observable<boolean> {
    return this.httpClient.put<boolean>(this.getUrl(formName), formData).pipe(catchError(this.handleError));
  }
  delete(formName: string, formData: any ): Observable<boolean> {
    const options = {
      body: formData
    };
    return this.httpClient.request<boolean>('delete', this.getUrl(formName), options).pipe(catchError(this.handleError));
  }
}
