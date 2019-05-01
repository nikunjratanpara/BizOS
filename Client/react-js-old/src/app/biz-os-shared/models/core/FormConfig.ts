import { FieldConfig } from "./FieldConfig";
import { FormOperations } from "./FormOperations";
export interface FormConfig {
    formName: string;
    cols?: number;
    operations?: FormOperations;
    controls: FieldConfig[];
}