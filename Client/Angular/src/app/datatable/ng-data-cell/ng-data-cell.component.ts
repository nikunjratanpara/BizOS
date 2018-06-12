import { Component, OnInit, Input } from '@angular/core';
import { IDataGridColumn } from '../models/data-grid.models';

@Component({
  selector: 'app-ng-data-cell',
  templateUrl: './ng-data-cell.component.html',
  styleUrls: ['./ng-data-cell.component.scss']
})
export class NgDataCellComponent implements OnInit {

  constructor() { }
  @Input()
  column: IDataGridColumn;
  @Input()
  data: any;
  ngOnInit() {
  }

}
