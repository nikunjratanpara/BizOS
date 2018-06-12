import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { IDataGridColumn } from '../models/data-grid.models';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-ng-data-body',
  templateUrl: './ng-data-body.component.html',
  styleUrls: ['./ng-data-body.component.scss']
})
export class NgDataBodyComponent implements OnInit, OnDestroy {

  constructor() { }

  @Input()
  columnSubject: BehaviorSubject<IDataGridColumn[]>;
  @Input()
  dataSource: Observable<Array<any>>;

  dataSet: Array<any> = [];
  columns: IDataGridColumn[];

  columnSubscription: Subscription;
  dataSubscripion: Subscription;

  ngOnInit() {
    this.dataSubscripion = this.dataSource.subscribe(data => this.dataSet = data );
    this.columnSubscription = this.columnSubject.subscribe(columns => this.columns = columns);
  }
  ngOnDestroy() {
    this.dataSubscripion.unsubscribe();
    this.columnSubscription.unsubscribe();
  }

}
