import { Observable } from 'rxjs/Observable';
import { IFieldConfig } from '../../models/field.config.interface';
export interface IDynamicFormService {
    GetFormConfig(formName: string): Observable<IFieldConfig[]>;
}
