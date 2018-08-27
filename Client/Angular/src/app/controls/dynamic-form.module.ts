import { NgModule, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFieldDirective } from './components/dynamic-field/dynamic-field.directive';
import { FormInputComponent } from './components/form-input/form-input.component';
import { FormSelectComponent } from './components/form-select/form-select.component';
import { FormButtonComponent } from './components/form-button/form-button.component';
import { FormTextareaComponent } from './components/form-textarea/form-textarea.component';
import { DynamicFormComponent } from './containers/dynamic-form/dynamic-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormCheckboxComponent } from './components/form-checkbox/form-checkbox.component';
import { FormRadioComponent } from './components/form-radio/form-radio.component';
import { FormDataComboComponent } from './components/form-data-combo/form-data-combo.component';
import { NgTypeaheadDirective } from './components/ng-typeahead/ng-typeahead.directive';
import { TypeaheadWindowComponent } from './components/ng-typeahead/typeahead.window.component';
import { FormDatetimeComponent } from './components/form-datetime/form-datetime.component';
import { NgDatetimeDirective } from './components/ng-datetime/ng-datetime.directive';
import { BrowserModule } from '@angular/platform-browser';
import { DatetimeWindowComponent } from './components/ng-datetime/datetime.window.component';
import { DatepickerNavigationComponent } from './components/ng-datetime/ng-datetime.navigation.component';
import { FormDisplayErrorsComponent } from './components/form-display-errors/form-display-errors.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { TranslatePipe } from './filters/translate.pipe';
import { DataGridCellComponent } from './components/data-table/data-grid-cell.component';
import { FormHiddenComponent } from './components/form-hidden/form-hidden.component';
import { HttpClientModule } from '@angular/common/http';
import { TranslateService, DynamicFormService, DataTableService, DataComboService, DynamicViewService } from '../biz-os-shared';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    FormInputComponent,
    FormSelectComponent,
    FormButtonComponent,
    FormTextareaComponent,
    DynamicFieldDirective,
    DynamicFormComponent,
    FormCheckboxComponent,
    FormRadioComponent,
    TypeaheadWindowComponent,
    FormDataComboComponent,
    NgTypeaheadDirective,
    FormDatetimeComponent,
    NgDatetimeDirective,
    DatetimeWindowComponent,
    DatepickerNavigationComponent,
    FormDisplayErrorsComponent,
    DataTableComponent,
    DataGridCellComponent,
    TranslatePipe,
    FormHiddenComponent
  ],
  exports : [
    DynamicFormComponent,
    FormInputComponent,
    FormSelectComponent,
    FormButtonComponent,
    FormTextareaComponent,
    DynamicFieldDirective,
    DynamicFormComponent,
    FormCheckboxComponent,
    FormRadioComponent,
    TypeaheadWindowComponent,
    FormDataComboComponent,
    NgTypeaheadDirective,
    FormDatetimeComponent,
    NgDatetimeDirective,
    DatetimeWindowComponent,
    DatepickerNavigationComponent,
    FormDisplayErrorsComponent,
    DataTableComponent,
    DataGridCellComponent,
    TranslatePipe,
    FormHiddenComponent
  ],
  entryComponents: [
    FormButtonComponent,
    FormInputComponent,
    FormSelectComponent,
    FormTextareaComponent,
    FormCheckboxComponent,
    FormRadioComponent,
    FormDataComboComponent,
    TypeaheadWindowComponent,
    FormDatetimeComponent,
    DatetimeWindowComponent,
    DatepickerNavigationComponent,
    FormHiddenComponent
  ],
  providers: [
    {provide: TranslateService, useClass: TranslateService},
    {provide: DynamicFormService, useClass: DynamicFormService},
    {provide: DataTableService, useClass: DataTableService},
    {provide: DataComboService, useClass: DataComboService},
    {provide: DynamicViewService, useClass: DynamicViewService},
  ]
})
export class DynamicFormModule { }
