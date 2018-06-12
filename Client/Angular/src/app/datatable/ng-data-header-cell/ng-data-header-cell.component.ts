import { Component, OnInit, Input } from '@angular/core';
import { IDataGridColumn } from '../models/data-grid.models';

@Component({
  selector: 'app-ng-data-header-cell',
  templateUrl: './ng-data-header-cell.component.html',
  styleUrls: ['./ng-data-header-cell.component.scss']
})
export class NgDataHeaderCellComponent implements OnInit {

  constructor() { }

  @Input()
  column: IDataGridColumn;
  ngOnInit() {
  }

}
