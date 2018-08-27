import {Component, Input} from '@angular/core';
import { ColModel } from './data-table.component';
import { isFunction } from '../../../store';

@Component({
    selector: 'data-grid-cell',
    template: `
        <div title="{{column.header}}" *ngIf="column.dataType !== 'html'">
           {{ displayText }}
        </div>
        <div *ngIf="column.dataType === 'html'" [innerHTML]="displayText"></div>
    `
})
export class DataGridCellComponent {
    @Input() column: ColModel;
    @Input() model: any;
    public get displayText(): string {
        if (this.column.formatter && isFunction(this.column.formatter)) {
            return this.column.formatter(this.model[this.column.dataField], this.model, this.column.settings);
        } else {
            return this.model[this.column.dataField];
        }
    }
    constructor() {
    }
}
