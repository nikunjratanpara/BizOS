
import { FormGroup, ValidatorFn, AbstractControl, FormBuilder } from '@angular/forms';
import { OnInit, Input } from '@angular/core';
import { Option, CustomValidations, FormModel, Error, IDatetimePickerOptions, TypeaheadOptions } from '../../../biz-os-shared';
export class BaseControlComponent implements OnInit {

  labelWidth: string;
  controlWidth: string;
  constructor(private fb: FormBuilder) {
    this.labelWidth = 'col-sm-12 col-md-2 col-form-label';
    this.controlWidth = ' col-sm-12 col-md-10';
  }
  @Input()
  type: string;
  @Input()
  name: string;
  @Input()
  disabled?: boolean;
  @Input()
  label?: string;
  @Input()
  options?: Option[] | string[] ;
  @Input()
  placeholder?: string;
  @Input()
  errors?: Error[];
  @Input()
  validation?: ValidatorFn[];
  @Input()
  customValidation?: CustomValidations;
  @Input()
  value?: any;
  @Input()
  cssClass?: string;
  @Input()
  typeaheadOptions?: TypeaheadOptions;
  @Input()
  datetimePickerOptions?: IDatetimePickerOptions;
  @Input()
  formModel: FormModel;
  @Input()
  containerCss: string;

  group: FormGroup;
  control: AbstractControl;
  ngOnInit() {
    this.defaultConfig();
    const controls = {};
    controls[this.name] = {};
    this.group = this.group || this.fb.group(controls);
    this.value = this.value || '';
    this.control = this.group.get(this.name);
  }

  defaultConfig(): void {
    this.cssClass = this.cssClass || 'form-control';
  }

  handleOptions(): void {
    if (this.options && this.options.length > 0 && typeof(this.options[0]) === 'string' ) {
      this.options = (this.options as string[]).map((option: string) => {
        return  {label: option, value: option} as Option;
     });
    }
  }
  isDisabled(): boolean {
    return (this.disabled
     || (this.formModel && this.formModel.isLocked)) ? true : undefined;
      // || (this.formModel && this.formModel.formMode === FormMode.Update && (this.control as any).isUpdatable);
  }
  hasError(): boolean {
    return this.errors && this.errors.length > 0;
  }
}
