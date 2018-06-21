import { Component, Input, Inject, OnInit, EventEmitter } from '@angular/core';
import { FormSelectComponent } from '../form-select/form-select.component';
import { CalendarService, MonthViewModel, NgbPeriod } from './calender.service';
import { TranslateService } from '../../services/translate.service';
import { I18N, CalenderI18n } from '../../i18N/calenderi18n.model';
import { NgDatetime, NavigationEvent, IDatetimePickerOptions } from './datetime.struct';
import { Observable } from 'rxjs';
import { isValidDate, ISODateFormat } from '../../utils/util';
@Component({
    selector: 'datetime-window',
    templateUrl: './datetime.window.template.html',
    styleUrls: ['../form-datetime/form-datetime.component.scss'],
    providers: [CalendarService]
})
export class DatetimeWindowComponent implements OnInit {
    constructor(private _calendar: CalendarService, private translateService: TranslateService) {
        this.i18n = this.translateService.getCalenderI18n();
    }
    @Input() config: IDatetimePickerOptions;
    selectItem: EventEmitter<NgDatetime> = new EventEmitter<NgDatetime>();
    public i18n: CalenderI18n;
    public currentSelected: NgDatetime;
    private oldDate: NgDatetime;
    private _month: number;
    private _year: number;
    private _day: number;
    month: MonthViewModel;
    ngOnInit() {
        this.currentSelected =
        this.currentSelected && isValidDate(this.currentSelected.format(ISODateFormat), ISODateFormat) ?
                                        this.currentSelected :
                                            NgDatetime.fromJSDate(new Date());
        this.month = this._calendar.getMonth(this.currentSelected.month, this.currentSelected.year);
    }
    onNavigateEvent(event: NgDatetime) {
        this.currentSelected = event;
        this.month = this._calendar.getMonth(this.currentSelected.month, this.currentSelected.year);
    }
    selectDate(date: NgDatetime) {
        // this.currentSelected = date;
        this.selectItem.emit(date);
    }

    focus(date: NgDatetime) {
        if (!this.config.disabled && isValidDate(date.format(ISODateFormat), ISODateFormat) && !this.currentSelected.equals(date)) {
            this.onNavigateEvent(date);
        }
    }
    focusMove(period?: NgbPeriod, number?: number) {
        this.focus(this._calendar.getNext(this.currentSelected, period, number));
    }
    moveEnd(maxDate: NgDatetime) {
        const endDate = maxDate || new NgDatetime(31, 12, this.currentSelected.year);
        this.focus(endDate);
    }
    moveHome(minDate: NgDatetime) {
        const endDate = minDate || new NgDatetime(1, 1, this.currentSelected.year);
        this.focus(endDate);
    }
    nextWeek() {
        this.focusMove('d', this._calendar.getDaysPerWeek());
    }
    prevWeek() {
        this.focusMove('d', this._calendar.getDaysPerWeek() * -1);
    }
    focusSelect() {
        this.selectDate(this.currentSelected);
    }
    isCurrentSelected(date: NgDatetime) {
        return this.currentSelected.equals(date);
    }
}
