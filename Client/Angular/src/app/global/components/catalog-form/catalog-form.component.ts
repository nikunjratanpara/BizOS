import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DynamicFormComponent } from '../../../controls/containers/dynamic-form/dynamic-form.component';
import { IDataGridSettings } from '../../../datatable/models/data-grid.models';
import { NgDataTableComponent } from '../../../datatable/ng-data-table/ng-data-table.component';
import { DynamicFormService, FormConfig, DynamicViewService, DynamicViewConfig } from '../../../biz-os-shared';
@Component({
  selector: 'app-catalog-form',
  templateUrl: './catalog-form.component.html',
  styleUrls: ['./catalog-form.component.scss']
})
export class CatalogFormComponent implements AfterViewInit, OnInit {

  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
  @ViewChild(NgDataTableComponent) grid: NgDataTableComponent;
  config: FormConfig;
  dataTableConfig: IDataGridSettings;
  formName: string;
  constructor(private route: ActivatedRoute,
    private dynamicFormService: DynamicFormService,
    private dynamicViewService: DynamicViewService) { }
  ngAfterViewInit() {
    /* let previousValid = this.form.valid;
     this.form.changes.subscribe(() => {
      if (this.form.valid !== previousValid) {
        previousValid = this.form.valid;
        this.form.setDisabled('submit', !previousValid);
      }
    });

    this.form.setDisabled('submit', true);
    */
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.formName = params.id;
      this.dynamicViewService.getViewConfig(this.formName).subscribe((dynamicViewConfig: DynamicViewConfig) => {
        if (dynamicViewConfig.formConfig) {
          this.config = {
            cols: 1,
            operations: {
              save: {
                uiKey: 'COMMON.BTN.SAVE',
                visible: true
              },
              reset: {
                uiKey: 'COMMON.BTN.RESET',
                visible: true
              },
              update: {
                uiKey: 'COMMON.BTN.UPDATE',
                visible: false
              },
              delete: {
                uiKey: 'COMMON.BTN.DELETE',
                visible: false
              }
            },
            controls: dynamicViewConfig.formConfig.controls,
            formName : dynamicViewConfig.formConfig.formName
          };
        } else {
          this.config = null;
        }

        if (dynamicViewConfig.gridConfig) {
          this.dataTableConfig = {
            columns: dynamicViewConfig.gridConfig.columns,
            source: dynamicViewConfig.gridConfig.source,
            pageSize: dynamicViewConfig.gridConfig.pageSize
          };
        } else {
          this.dataTableConfig = null;
        }
      });
      console.dir(this.formName);
    });
  }

  submit(value: { [name: string]: any }) {
    console.log(value);
  }
  onSave(event: any): Observable<boolean> {
    const saveObservable: Observable<boolean> = this.dynamicFormService.create(this.formName, event);
    saveObservable.subscribe(
      (isSaved) => {
        if (isSaved) {
          this.toggelButtons(true);
          this.form.resetForm();
          this.grid.refreshData();
        }
      }
    );
    return saveObservable;
  }
  onReset(model: any): Observable<boolean> {
    this.toggelButtons(true);
    return of(true);
  }
  onUpdate(model: any): Observable<boolean> {
    const updateObservable: Observable<boolean> = this.dynamicFormService.update(this.formName, model);
    updateObservable.subscribe(
      (isSaved) => {
        if (isSaved) {
          this.toggelButtons(false);
          this.grid.refreshData();
        }
      }
    );
    return updateObservable;
  }
  onDelete(model: any): Observable<boolean> {
    const deleteObservable: Observable<boolean> = this.dynamicFormService.delete(this.formName, model);
    deleteObservable.subscribe(
      (isSaved) => {
        if (isSaved) {
          this.grid.refreshData();
          this.form.resetForm();
          this.toggelButtons(true);
        }
      }
    );
    return deleteObservable;
  }
  onRowSelect(rowData) {
    this.assignValue(rowData);
    console.dir(rowData);
  }
  private toggelButtons(isSave: boolean) {
    this.config.operations.save.visible = isSave;
    this.config.operations.update.visible = !isSave;
    this.config.operations.delete.visible = !isSave;
  }
  assignValue(model: any) {
    if (this.form) {
      const obj: any = {};
      this.form.controls.forEach(control => {
        if (model[control.name]) {
            obj[control.name] = model[control.name];
        }
      });
      this.form.setValue(obj);
      this.toggelButtons(false);
    }
  }
}
