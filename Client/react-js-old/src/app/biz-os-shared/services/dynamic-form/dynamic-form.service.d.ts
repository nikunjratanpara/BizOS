import { BaseService } from '../base.service';
import { Observable } from 'rxjs';
import { FieldConfig } from "../../models/core/FieldConfig";
import { IDynamicFormService } from './dynamic.form.service.interface';
export declare class DynamicFormService extends BaseService implements IDynamicFormService {
    constructor();
    GetFormConfig(formName: string): Observable<FieldConfig[]>;
    create(formName: string, formData: any): Observable<boolean>;
    update(formName: string, formData: any): Observable<boolean>;
    delete(formName: string, formData: any): Observable<boolean>;
}
