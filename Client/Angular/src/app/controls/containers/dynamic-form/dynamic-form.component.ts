import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import {
  IFieldConfig, minDate, IFieldValidator, maxNumber, minNumber, maxDate,
  IFormConfig, IFormModel, FormMode
} from '../../models/field.config.interface';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DatepickerNavigationComponent } from '../../components/ng-datetime/ng-datetime.navigation.component';
import { NgDatetime } from '../../components/ng-datetime/datetime.struct';

import { CalendarService } from '../../components/ng-datetime/calender.service';
import { isValidDate, ISODateFormat, isInteger, isNumber, isFunction, isDefined } from '../../utils/util';
import { TranslateService } from '../../services/translate.service';
import { Event } from '@angular/router/src/events';
import { required, ICustomValidations } from '../../models/field.config.interface';

@Component({
  exportAs: 'dynamicForm',
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit, OnChanges {
  @Input()
  config: IFormConfig;

  @Output()
  onSave: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  onUpdate: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  onDelete: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  onReset: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  onSearch: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;
  formModel: IFormModel;
  dateFormat = 'dd/MM/yyyy';
  get controls() { return this.config && this.config.controls ? this.config.controls.filter(({ type }) => type !== 'button') : []; }
  get changes() { return this.form.valueChanges; }
  get valid() { return this.form.valid; }
  get value() { return this.form.value; }
  get cssLayoutCols() {
    return (this.config && this.config.cols ? 'col-md-' + Math.ceil(12 / this.config.cols) : 'col-md-12') + ' col-sm-12';
  }

  get isOperations() {
    return this.config && this.config.operations;
  }
  get isSave() {
    return this.isOperations && this.config.operations.save;
  }
  get isUpdate() {
    return this.isOperations && this.config.operations.update;
  }
  get isDelete() {
    return this.isOperations && this.config.operations.delete;
  }
  get isReset() {
    return this.isOperations && this.config.operations.reset;
  }
  get isSearch() {
    return this.isOperations && this.config.operations.search;
  }
  get btnSaveConfig() {
    return this.isSave ? this.config.operations.save : {};
  }
  get btnUpdateConfig() {
    return this.isUpdate ? this.config.operations.update : {};
  }
  get btnDeleteConfig() {
    return this.isDelete ? this.config.operations.delete : {};
  }
  get btnResetConfig() {
    return this.isReset ? this.config.operations.reset : {};
  }
  get btnSearchConfig() {
    return this.isSearch ? this.config.operations.search : {};
  }

  constructor(private fb: FormBuilder, private translate: TranslateService) {
    this.formModel = { formMode: FormMode.New, isLocked: false };
  }

  ngOnInit() {
    this.form = this.createGroup();
    this.onSave.subscribe(returnVal => console.dir(returnVal));
    //   this.config = this.config || {cols: 1};
  }

  ngOnChanges() {
    if (this.form) {
      const controls = Object.keys(this.form.controls);
      const configControls = this.controls.map((item) => item.name);

      controls
        .filter((control) => !configControls.includes(control))
        .forEach((control) => this.form.removeControl(control));

      configControls
        .filter((control) => !controls.includes(control))
        .forEach((name) => {
          const config = this.config.controls.find((control) => control.name === name);
          this.form.addControl(name, this.createControl(config));
          this.form.reset();
        });

    }
  }

  createGroup() {
    const group = this.fb.group({});
    this.controls.forEach(control => {
      control.formModel = this.formModel;
      group.addControl(control.name, this.createControl(control));
    });
    return group;
  }

  createControl(config: IFieldConfig) {
    const { disabled, validation, value } = config;
    return this.fb.control({ disabled, value }, validation);
  }

  handleSubmit(event: Event) {
    if (this.validateForm()) {

    }
    console.dir(this.controls);
  }
  handleSaveClick(event: Event) {
    if (this.validateForm()) {
      this.onSave.emit(this.form.getRawValue());
    }
    console.dir(this.controls);
  }

  handleUpdateClick(event: Event) {
    if (this.validateForm()) {
      this.onUpdate.emit(this.form.getRawValue());
    }
    console.dir(this.controls);
  }

  handleDeleteClick(event: Event) {
    if (this.validateForm()) {
      this.onDelete.emit(this.form.getRawValue());
    }
    console.dir(this.controls);
  }

  handleSearchClick(event: Event) {
    if (this.validateForm()) {
      this.onSearch.emit(this.form.getRawValue());
    }
    console.dir(this.controls);
  }

  handleResetClick(event: Event) {
    this.resetForm();
    this.onReset.emit(this.form.getRawValue());
    console.dir(this.controls);
  }

  setDisabled(name: string, disable: boolean) {
    if (this.form.controls[name]) {
      const method = disable ? 'disable' : 'enable';
      this.form.controls[name][method]();
      return;
    }

    this.config.controls = this.config.controls.map((item) => {
      if (item.name === name) {
        item.disabled = disable;
      }
      return item;
    });
  }

  patchValue(name: string, value: any) {
    this.form.patchValue(value);
    this.formModel.formMode = FormMode.Update;
    this.setControlEnableDisable();
    // this.form.controls[name].setValue(value, { emitEvent: true });
  }
  setValue(value: any) {
    this.form.setValue(value);
    this.formModel.formMode = FormMode.Update;
    this.setControlEnableDisable();
  }
  resetForm() {
    this.form.reset();
    this.formModel.formMode = FormMode.New;
    this.setControlEnableDisable();
  }
  private validateForm(): boolean {
    let isValid = true;
    isValid = this.validateRequiredControls() && isValid;
    isValid = this.validateMinDateControls() && isValid;
    isValid = this.validateMaxDateControls() && isValid;
    isValid = this.validateMinNumberControls() && isValid;
    isValid = this.validateMaxNumberControls() && isValid;
    return isValid;
  }
  private validateRequiredControls(): boolean {
    let isValid = true;
    const requiredControls = this.getRequiredControls(required);
    if (requiredControls && requiredControls.length) {
      requiredControls.forEach(control => {
        control.errors = [];
        let isValidControl = false;
        const requiredControl = this.form.get(control.name);
        const controlValue: any = requiredControl.value;
        if (!isDefined(controlValue) || controlValue === null || controlValue === '') {
          isValidControl = false;
          isValid = isValid && isValidControl;
        }
        if (!isValidControl) {
          control.errors.push({
            errorCode: 'required',
            error: this.translate.format('Invalid_required')
          });
        }
      });
    }
    return isValid;
  }
  private validateMinDateControls(): boolean {
    let isValid = true;
    const minDateControls = this.getRequiredControls(minDate);
    if (minDateControls && minDateControls.length) {
      minDateControls.forEach(control => {
        let isValidControl = true;
        control.errors = [];
        const dateControl = this.form.get(control.name);
        const date: NgDatetime = NgDatetime.fromJSDate(dateControl.value);
        const customValidation: IFieldValidator = this.getCustomValidation(control.customValidation, minDate);
        let dateValidateWith: NgDatetime = null;
        if (isValidDate(customValidation.validateWith as string, ISODateFormat)) {
          dateValidateWith = NgDatetime.fromJSDate(new Date(customValidation.validateWith as string));
        } else {
          const validationControl = this.form.get(customValidation.validateWith as string);
          if (validationControl) {
            dateValidateWith = NgDatetime.fromJSDate(new Date(validationControl.value as string));
          }
        }
        if (dateValidateWith) {
          isValidControl = date.after(dateValidateWith);
          isValid = isValid && isValidControl;
        }
        if (!isValidControl) {
          control.errors.push({
            errorCode: 'minDate',
            error: this.translate.format('Invalid_minDate', customValidation.validateWith)
          });
        }
      });
    }
    return isValid;
  }
  private validateMaxDateControls(): boolean {
    let isValid = true;
    const maxDateControls = this.getRequiredControls(maxDate);
    if (maxDateControls && maxDateControls.length) {
      maxDateControls.forEach(control => {
        control.errors = [];
        let isValidControl = false;
        const dateControl = this.form.get(control.name);
        const date: NgDatetime = NgDatetime.fromJSDate(dateControl.value);
        const customValidation: IFieldValidator = this.getCustomValidation(control.customValidation, maxDate);
        let dateValidateWith: NgDatetime = null;
        if (isValidDate(customValidation.validateWith as string, ISODateFormat)) {
          dateValidateWith = NgDatetime.fromJSDate(new Date(customValidation.validateWith as string));
        } else {
          const validationControl = this.form.get(customValidation.validateWith as string);
          if (validationControl) {
            dateValidateWith = NgDatetime.fromJSDate(new Date(validationControl.value as string));
          }
        }
        if (dateValidateWith) {
          isValidControl = date.before(dateValidateWith);
          isValid = isValid && isValidControl;
        }
        if (!isValidControl) {
          control.errors.push({
            errorCode: 'maxDate',
            error: this.translate.format('Invalid_maxDate', customValidation.validateWith)
          });
        }
      });
    }
    return isValid;
  }
  private validateMinNumberControls(): boolean {
    let isValid = true;
    const minNumberControls = this.getRequiredControls(minNumber);
    if (minNumberControls && minNumberControls.length) {
      minNumberControls.forEach(control => {
        control.errors = [];
        let isValidControl = false;
        const numberControl = this.form.get(control.name);
        const controlValue: number = numberControl.value;
        const customValidation: IFieldValidator = this.getCustomValidation(control.customValidation, minNumber);
        let numberValidateWith: number = null;
        if (isNumber(customValidation.validateWith)) {
          numberValidateWith = Number(customValidation.validateWith);
        } else {
          const validationControl = this.form.get(customValidation.validateWith as string);
          if (validationControl) {
            numberValidateWith = Number(validationControl.value);
          }
        }
        if (numberValidateWith && !isNumber(numberValidateWith) && !isNumber(controlValue)) {
          isValidControl = controlValue >= numberValidateWith;
          isValid = isValid && isValidControl;
        }
        if (!isValidControl) {
          control.errors.push({
            errorCode: 'minNumber',
            error: this.translate.format('Invalid_minNumber', customValidation.validateWith)
          });
        }
      });
    }
    return isValid;
  }
  private validateMaxNumberControls(): boolean {
    let isValid = true;
    const maxNumberControls = this.getRequiredControls(maxNumber);
    if (maxNumberControls && maxNumberControls.length) {
      maxNumberControls.forEach(control => {
        control.errors = [];
        let isValidControl = false;
        const numberControl = this.form.get(control.name);
        const controlValue: number = numberControl.value;
        const customValidation: IFieldValidator = this.getCustomValidation(control.customValidation, maxNumber);
        let numberValidateWith: number = null;
        if (isInteger(customValidation.validateWith)) {
          numberValidateWith = Number(customValidation.validateWith);
        } else {
          const validationControl = this.form.get(customValidation.validateWith as string);
          if (validationControl) {
            numberValidateWith = Number(validationControl.value);
          }
        }
        if (numberValidateWith && !isNaN(numberValidateWith) && !isNaN(controlValue)) {
          isValidControl = controlValue <= numberValidateWith;
          isValid = isValid && isValidControl;
        }
        if (!isValidControl) {
          control.errors.push({
            errorCode: 'maxNumber',
            error: this.translate.format('Invalid_maxNumber', customValidation.validateWith)
          });
        }
      });
    }
    return isValid;
  }
  private getRequiredControls(validationType: string) {
    return this.controls.filter(control => {
      return !control.disabled && this.isValidationRequired(control.customValidation, validationType);
    });
  }
  private isValidationRequired(customValidation: ICustomValidations, validationType: string): boolean {
    return !!this.getCustomValidation(customValidation, validationType);
  }
  private getCustomValidation(customValidation: ICustomValidations, validationType: string): IFieldValidator {
    let validation = null;
    if (customValidation && customValidation[validationType]) {
      validation = {};
      validation[validationType] = customValidation[validationType];
    }
    return validation;
  }
  private setControlEnableDisable() {
    this.controls.forEach(controlConfig => {
      if (this.formModel.formMode === FormMode.Update && controlConfig.isUpdatable !== undefined) {
        this.setDisabled(controlConfig.name, !controlConfig.isUpdatable);
      } else {
        this.setDisabled(controlConfig.name, false);
      }
    });
  }
}
