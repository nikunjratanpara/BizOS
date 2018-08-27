import { Directive, OnInit, OnChanges, Input, ComponentRef, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormButtonComponent } from '../form-button/form-button.component';
import { FormInputComponent } from '../form-input/form-input.component';
import { FormTextareaComponent } from '../form-textarea/form-textarea.component';
import { FormSelectComponent } from '../form-select/form-select.component';
import { FormCheckboxComponent } from '../form-checkbox/form-checkbox.component';
import { FormRadioComponent } from '../form-radio/form-radio.component';
import { FormDataComboComponent } from '../form-data-combo/form-data-combo.component';
import { FormDatetimeComponent } from '../form-datetime/form-datetime.component';
import { FormHiddenComponent } from '../form-hidden/form-hidden.component';
import { FieldConfig, DynamicField } from '../../../biz-os-shared';
import { Field } from '../../models/field.interface';

const components = {
button : FormButtonComponent,
submit : FormButtonComponent,
checkbox : FormCheckboxComponent,
color : FormInputComponent,
date : FormInputComponent,
datetime : FormDatetimeComponent,
email : FormInputComponent,
file : FormInputComponent,
hidden : FormHiddenComponent,
image : FormInputComponent,
month : FormInputComponent,
number : FormInputComponent,
password : FormInputComponent,
radio : FormRadioComponent,
range : FormInputComponent,
reset : FormInputComponent,
search : FormInputComponent,
tel : FormInputComponent,
text : FormInputComponent,
time : FormInputComponent,
url : FormInputComponent,
week : FormInputComponent,
textarea : FormTextareaComponent,
select : FormSelectComponent,
datacombo: FormDataComboComponent
};

@Directive({
  selector: '[dynamicField]'
})
export class DynamicFieldDirective implements DynamicField, OnInit, OnChanges {
  @Input()
  config: FieldConfig;

  @Input()
  group: FormGroup;

  component: ComponentRef<Field>;
  constructor(private resolver: ComponentFactoryResolver, private container: ViewContainerRef) { }

  ngOnChanges() {
    if (this.component) {
      this.assignComponentConfig();
    }
  }

  ngOnInit() {
    if (!components[this.config.type]) {
      const supportedTypes = Object.keys(components).join(', ');
      throw new Error(
        `Trying to use an unsupported type (${this.config.type}).
        Supported types: ${supportedTypes}`
      );
    }
    const component = this.resolver.resolveComponentFactory<Field>(components[this.config.type]);
    this.component = this.container.createComponent(component);
    this.assignComponentConfig();
  }

  private assignComponentConfig() {
    this.component.instance.label = this.config.label;
    this.component.instance.type = this.config.type;
    this.component.instance.cssClass = this.config.cssClass;
    this.component.instance.customValidation = this.config.customValidation;
    this.component.instance.datetimePickerOptions = this.config.datetimePickerOptions;
    this.component.instance.disabled = this.config.disabled;
    this.component.instance.errors = this.config.errors;
    this.component.instance.name = this.config.name;
    this.component.instance.options = this.config.options;
    this.component.instance.placeholder = this.config.placeholder;
    this.component.instance.typeaheadOptions = this.config.typeaheadOptions;
    this.component.instance.value = this.config.value;
    this.component.instance.formModel = this.config.formModel;
    this.component.instance.group = this.group;

    this.config.validate = this.component.instance.validate;
  }
}
