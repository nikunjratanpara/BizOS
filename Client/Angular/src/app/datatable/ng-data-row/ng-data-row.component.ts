import { Component, OnInit, Input } from '@angular/core';
import { IDataGridColumn } from '../models/data-grid.models';

@Component({
  selector: 'app-ng-data-row',
  templateUrl: './ng-data-row.component.html',
  styleUrls: ['./ng-data-row.component.scss']
})
export class NgDataRowComponent implements OnInit {

  constructor() { }
  @Input()
  columns: Array<IDataGridColumn>;
  @Input()
  data: any;
  ngOnInit() {
  }

}
