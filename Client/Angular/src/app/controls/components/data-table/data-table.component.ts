import { Component, OnInit, Input, EventEmitter, Output, OnChanges, OnDestroy, ViewChild } from '@angular/core';
import { IDataTableConfig, IDataRequestModel } from './models/dataTableConfig.model';
import { BehaviorSubject, Subscription, Observable, of  } from 'rxjs';
import { ICatalogFilterOptions } from '../../services/models/catalog.filter.interface';
import { formatDate, extend, stringify } from '../../utils/util';
import { IColModel } from './models/IColModel';
import { IFormatter } from './models/IFormatter';
import { IDateFormatOptions } from './models/IDateFormatOptions';
import { INumberFormatOptions } from './models/INumberFormatOptions';
import { IFormatOptions } from './models/IFormatOptions';
import { HttpModule } from '@angular/http';
import { DataTableService } from '../../services/data-table/data-table.service';
import { switchMap } from 'rxjs/operators';
import { ISourceConfiguration } from './models/ISourceConfiguration';
import { validateConfig } from '@angular/router/src/config';

import { DynamicFormComponent } from '../../containers/dynamic-form/dynamic-form.component';
import { setRootDomAdapter } from '@angular/platform-browser/src/dom/dom_adapter';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
    selector: 'data-table',
    templateUrl: './data-table.component.html',
    styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements OnInit, OnChanges, OnDestroy {

    @Input()
    private config: IDataTableConfig;
    @Input()
    private filters: any;
    @Output()
    private rowSelect: EventEmitter<any> = new EventEmitter();
    @ViewChild(DynamicFormComponent)
    private searchForm: DynamicFormComponent;

    private activeIdx: number;
    private dataset: Array<any>;
    private queryData: BehaviorSubject<ISourceConfiguration> = new BehaviorSubject<ISourceConfiguration>(null);
    private dataRequestModel: IDataRequestModel = { pageNo: 1, pageSize: 10, search: {}};
    private sourceSubscription: Subscription;
    constructor(private dataTableService: DataTableService ) {}
    ngOnInit() {
        this.config.cols.forEach((colModel: IColModel) => {
            colModel = this.defaultColModel(colModel);
        });
        const cols = [];
        if (this.config.searchConfig) {
            this.config.searchConfig.operations = {
                search : {
                    uiKey: 'COMMON.BTN.SEARCH',
                    visible: true
                },
                reset: {
                    uiKey: 'COMMON.BTN.CLEAR',
                    visible: true
                }
            };
        }
        this.sourceSubscription =  this.queryData.pipe(
            switchMap((sourceConfiguration: ISourceConfiguration) =>  this.reload(sourceConfiguration))
        ).
        subscribe(resultset => this.dataset = resultset);
        this.queryData.next(this.config.source);
    }
    ngOnChanges(changes: any) {
        if (changes.hasOwnProperty('filter')) {
            this.queryData.next(changes.filter);
        } else {
            this.queryData.next(this.config.source);
        }
    }
    ngOnDestroy() {
        this.sourceSubscription.unsubscribe();
        this.queryData.unsubscribe();
    }
    onSearch(value: any) {
        const filter = {};
        for (const key in value) {
            if (value[key]) {
                filter[key] = value[key].code || value[key];
            }
        }
        this.config.source.parameters = filter ;
        this.queryData.next(this.config.source);
        return of(true);
    }
    onRowSelect(model: any, index: number) {
        this.activeIdx = index;
        this.rowSelect.emit(model);
    }
    public refreshData() {
        this.queryData.next(this.config.source);
    }
    private reload(sourceConfiguration: ISourceConfiguration): Observable<any[]> {
        // return this.dataTableService.getSourceObservable(sourceConfiguration);
        return of([]);
    }
    private getRenderer(colModel: IColModel): IFormatter {
        let renderer: IFormatter;
        if (colModel.formatter) {
            return colModel.formatter;
        } else {
            switch (colModel.dataType.toLowerCase()) {
                case 'date':
                    renderer = this.dateFormatter;
                    break;
                case 'number':
                    renderer = this.numberFormatter;
                    break;
                default:
                    renderer = (colData: string, rowData: any, settings: IDateFormatOptions): string => {
                        return colData;
                    };
                    break;
            }
        }
        return renderer;
    }
    private dateFormatter(colData: any, rowData: any, settings: IDateFormatOptions): string {
        return formatDate(colData, settings.datefmt);
    }
    private numberFormatter(colData: string, rowData: any, settings: INumberFormatOptions): string {
        colData = colData || settings.defaultValue;
        return String(settings.prefix +
            parseFloat(colData).toFixed(settings.decimalPlaces)
            .replace(',', settings.thousandSeparator)
            .replace('.', settings.decimalSeparator) +
            settings.suffix);
    }
    private defaultColModel(colModel: IColModel): ColModel {
        const col: ColModel = new ColModel();
        col.align = colModel.align || col.align;
        col.colSpan = colModel.colSpan || 1;
        col.cssClass = (colModel.cssClass || '') + col.align;
        col.header = colModel.header;
        col.defaultValue = colModel.defaultValue || '';
        col.dataType = colModel.dataType || col.dataType;
        col.width = colModel.width;
        colModel.dataType = col.dataType;
        col.formatter = this.getRenderer(colModel);
        col.dataField = colModel.dataField;

        col.settings = extend(extend(col.settings, colModel.dateFormatter), colModel.numberFormatter);
        return col;
    }
}



export class ColModel {
    dataType: string;
    header: string;
    dataField: string;
    formatter: IFormatter;
    colSpan: number;
    align: string;
    cssClass: string;
    defaultValue: string;
    width: number;
    settings: IFormatOptions;
    constructor() {
        this.dataField = '';
        this.defaultValue = ' ';
        this.dataType = 'string';
        this.settings = {
            defaultValue: '',
            datefmt: 'dd/MM/yyyy',
            align: 'left',
            thousandSeparator: ',',
            decimalSeparator: '.',
            decimalPlaces: 2,
            prefix: '',
            suffix: ''
        };
    }
}

