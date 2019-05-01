import { Observable } from 'rxjs';
import { FieldConfig } from "../../models/core/FieldConfig";
export interface IDynamicFormService {
    GetFormConfig(formName: string): Observable<FieldConfig[]>;
}
