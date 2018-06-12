
import { FormGroup } from '@angular/forms';
import { IFieldConfig } from './field.config.interface';

export interface IField extends IFieldConfig {
    group: FormGroup;
}

export interface IDynamicField {
    config: IFieldConfig;
    group: FormGroup;
}
