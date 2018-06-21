import { Observable } from 'rxjs';
import { IFieldConfig } from '../../models/field.config.interface';
export interface IDynamicFormService {
    GetFormConfig(formName: string): Observable<IFieldConfig[]>;
}
