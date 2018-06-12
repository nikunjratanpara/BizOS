import { Component, OnInit, Input, OnDestroy, OnChanges, EventEmitter, Output } from '@angular/core';
import { IDataGridSettings, IDataSource, IDataGridColumn, IGridOutcome } from '../models/data-grid.models';
import { DataTableService } from '../../controls/services/data-table/data-table.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/subscription';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-ng-data-table',
    templateUrl: './ng-data-table.component.html',
    styleUrls: ['./ng-data-table.component.scss']
})
export class NgDataTableComponent implements OnInit, OnChanges, OnDestroy {

    @Input()
    options: IDataGridSettings = {};
    @Output()
    rowSelect: EventEmitter<any> = new EventEmitter();

    activeIdx = -1;

    pageNo = 1;
    totalRecords = 0;

    private queryData: BehaviorSubject<IDataSource> = new BehaviorSubject<IDataSource>(null);
    private dataObservable: Observable<IGridOutcome>;
    private columnSubject: BehaviorSubject<IDataGridColumn[]> = new BehaviorSubject<IDataGridColumn[]>(null);
    private dataSet: any[];
    private dataSubscription: Subscription;
    constructor(private dataTableService: DataTableService) { }

    ngOnInit() {
        this.initSource();
        this.dataObservable = this.queryData.switchMap(
            (sourceConfiguration: IDataSource) => this.reload(sourceConfiguration)
        );
        this.dataSubscription = this.dataObservable.subscribe(data => {
            this.dataSet = data.resultSet;
            this.totalRecords = data.totalRecords;
            this.activeIdx = -1;
        });
        this.columnSubject.next(this.options.columns);
        this.queryData.next(this.options.source);
    }
    ngOnChanges(changes: any) {
        if (changes['options']) {
            this.initSource();
        }
        this.columnSubject.next(this.options.columns);
        this.queryData.next(this.options.source);
        this.activeIdx = -1;
        this.dataSet = null;
    }
    initSource() {
        if (!this.options.source.requestPayload) {
            this.options.source.requestPayload = {
                pageNo: 1,
                pageSize: this.options.pageSize || 10,
                orderBy: this.options.columns[0].dataField
            };
        } else {
            this.options.source.requestPayload.pageNo = 1;
            this.options.source.requestPayload.pageSize = this.options.pageSize || 10;
            this.options.source.requestPayload.orderBy = this.options.columns[0].dataField;
        }
        this.pageNo = 1;
    }
    ngOnDestroy() {
        this.queryData.unsubscribe();
        this.dataSubscription.unsubscribe();
        this.columnSubject.unsubscribe();
    }
    onRowSelect(model: any, index: number) {
        if (this.activeIdx !== index) {
            this.activeIdx = index;
            this.rowSelect.emit(model);
        }
    }
    public refreshData() {
        this.queryData.next(this.options.source);
    }
    public onPageChange(event) {
        this.options.source.requestPayload.pageNo = event.pageNo;
        this.pageNo = event.pageNo;
        this.queryData.next(this.options.source);
    }
    private reload(sourceConfiguration: IDataSource): Observable<IGridOutcome> {
        return this.dataTableService.getSourceObservable(sourceConfiguration);
    }

}
