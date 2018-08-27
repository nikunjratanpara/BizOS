import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../biz-os-shared';


export interface Field extends FieldConfig {
    group: FormGroup;
}

export interface DynamicField {
    config: FieldConfig;
    group: FormGroup;
}