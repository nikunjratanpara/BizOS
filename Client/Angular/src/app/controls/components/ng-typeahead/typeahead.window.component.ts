import { Component, Input, HostListener, HostBinding, OnInit, Output, EventEmitter, OnDestroy, ElementRef } from '@angular/core';
import { IComboFormatter } from '../../models/combo.formatter.interface';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/subscription';
import { ICatalogData } from '../../models/catalog.data.interface';


@Component({
    selector: 'app-typeahead-window',
    template: `
    <ng-template ngFor [ngForOf]="dataset" let-comboItem let-idx="index">
        <a [id]="id + '-' + idx"
        [class.selected] = "idx === activeIdx"
        class="typeahead-dropdown-item"
        role="option"
        (mouseenter)="markActive(idx)"
        (click)="select(comboItem)" >
            <span [innerHtml]="formatter(comboItem)"></span>
        </a>
    </ng-template>
    `
})
export class TypeaheadWindowComponent {
    activeIdx: number;
    subscription: Subscription;
    get activeResult(): ICatalogData {
        if (this.dataset && this.dataset.length > 0) {
            return this.dataset[this.activeIdx];
        }
    }
    @HostBinding('class')
    cssClass = 'typeahead-dropdown-menu data-combo-dropdown';
    @HostBinding('style.display')
    style = 'block';

    /*@HostBinding('role')
    role = 'listbox';
*/
    @HostBinding('id')
    @Input('id')
    id: string;

    @Input('formatter')
    formatter: (comboItem: ICatalogData) => string;

    @Input('dataset')
    dataset: Array<ICatalogData>;

    @Output('selectEvent')
    selectEvent: EventEmitter<ICatalogData> = new EventEmitter<ICatalogData>();

    private optionHeight = 32;
    constructor(private element: ElementRef ) {}
    public next() {
        if (this.dataset && this.dataset.length - 1 > this.activeIdx) {
            this.activeIdx++;
        } else if (this.activeIdx === undefined || this.activeIdx === null  || this.activeIdx < 0) {
            this.activeIdx = 0;
        }
        this.setScroll();
    }
    public prev() {
        if (this.activeIdx > 0) {
            this.activeIdx--;
        } else if (this.activeIdx === undefined || this.activeIdx === null  || this.activeIdx < 0) {
            this.activeIdx = 0;
        }
        this.setScroll();
    }
    markActive(idx: number) {
        this.activeIdx = idx;
    }
    select(comboItem: ICatalogData) {
        this.selectEvent.emit(comboItem);
    }
    setScroll() {
        this.element.nativeElement.scrollTop = this.activeIdx * this.optionHeight;
    }
}
