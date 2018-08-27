import { BaseService } from '../base.service';
import { Observable } from 'rxjs';
import { FieldConfig } from "../../models/core/FieldConfig";
import { IDynamicFormService } from './dynamic.form.service.interface';
import { catchError } from 'rxjs/operators';
export class DynamicFormService extends BaseService implements IDynamicFormService {

  constructor() {
    super('DynamicForm');
   }
   GetFormConfig(formName: string): Observable<FieldConfig[]> {
    return this.httpClientService.get<FieldConfig[]>({url: this.getUrl(formName)}).pipe(catchError(this.handleError));
   }
   create(formName: string, formData: any ): Observable<boolean> {
     return this.httpClientService.post<boolean>({url: this.getUrl(formName), body: formData}).pipe(catchError(this.handleError));
   }
   update(formName: string, formData: any ): Observable<boolean> {
    return this.httpClientService.put<boolean>({url: this.getUrl(formName), body: formData}).pipe(catchError(this.handleError));
  }
  delete(formName: string, formData: any ): Observable<boolean> {
    /* const requestConfig: axios.AxiosRequestConfig = {
      method: 'delete',
      url : this.getUrl(formName),
      data : formData
    }; */
    return this.httpClientService.delete<boolean>({url: this.getUrl(formName), body: formData}).pipe(catchError(this.handleError));
  }
}
