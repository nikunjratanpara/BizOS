import { Component, OnInit, Input, OnChanges, OnDestroy } from '@angular/core';
import { IDataGridColumn } from '../models/data-grid.models';
import { IColGroup } from '../../controls/components/data-table';
import { forEach } from '@angular/router/src/utils/collection';
import { BehaviorSubject } from 'rxjs';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ng-data-header',
  templateUrl: './ng-data-header.component.html',
  styleUrls: ['./ng-data-header.component.scss']
})
export class NgDataHeaderComponent implements OnInit, OnChanges, OnDestroy {

  @Input()
  columnSubject: BehaviorSubject<IDataGridColumn[]>;

  columnSubscription: Subscription;
  columns: IDataGridColumn[];

  constructor() { }

  ngOnInit() {
   this.columnSubscription = this.columnSubject.subscribe(columns => this.columns = columns);
  }
  ngOnChanges() {
  }
  ngOnDestroy() {
    this.columnSubscription.unsubscribe();
  }
}
