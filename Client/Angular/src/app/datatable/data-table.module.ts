import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgDataTableComponent } from './ng-data-table/ng-data-table.component';
import { NgDataHeaderComponent } from './ng-data-header/ng-data-header.component';
import { NgDataBodyComponent } from './ng-data-body/ng-data-body.component';
import { NgDataRowComponent } from './ng-data-row/ng-data-row.component';
import { NgDataCellComponent } from './ng-data-cell/ng-data-cell.component';
import { NgDataHeaderCellComponent } from './ng-data-header-cell/ng-data-header-cell.component';
import { NgDataFootComponent } from './ng-data-foot/ng-data-foot.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgDataTablePaginationComponent } from './ng-data-table-pagination/ng-data-table-pagination.component';
import { DynamicFormModule } from '../controls/dynamic-form.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    DynamicFormModule
  ],
  declarations: [
    NgDataTableComponent,
    NgDataHeaderComponent,
    NgDataBodyComponent,
    NgDataRowComponent,
    NgDataCellComponent,
    NgDataHeaderCellComponent,
    NgDataFootComponent,
    NgDataTablePaginationComponent
  ],
  exports: [
    NgDataTableComponent
  ]
})
export class DataTableModule { }
