import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CalendarService } from './calender.service';
import CalenderI18n from '../../../biz-os-shared/i18N/CalenderI18n';
import { TranslateService, toInteger, NgDatetime, NavigationEvent, IDatetimePickerOptions } from '../../../biz-os-shared';

@Component({
    selector: 'datepicker-navigation',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: [`
    select {
      /* to align with btn-sm */
      padding: 0.25rem 0.5rem;
      font-size: 0.875rem;
      line-height: 1.25;
      /* to cancel the custom height set by custom-select */
      height: inherit;
      width: 100%;
    }
    .btn-link {
        border:transparent;
    }
  `],
    template: `
    <div class="row">
    <div class="col-2">
    <button type="button" class="btn-link" (click)="doNavigate(navigation.PREV)" [disabled]="prevDisabled()" tabindex="-1">
        <i class="fa fa-chevron-left" aria-hidden="true"></i>
    </button>
    </div>
    <div class="col-4">
      <select
      [disabled]="disabled"
      class="custom-select d-inline-block"
      [value]="currentSelected?.month"
      (change)="changeMonth($event.target.value)"
      tabindex="-1">
        <option *ngFor="let m of months" [value]="m">{{ i18n.monthShortNames[m -1] }}</option>
        </select>
        </div>
        <div class="col-4">
        <select
      [disabled]="disabled"
      class="custom-select d-inline-block"
      [value]="currentSelected?.year"
      (change)="changeYear($event.target.value)"
      tabindex="-1">
        <option *ngFor="let y of years" [value]="y">{{ y }}</option>
    </select>
    </div>
    <div class="col-2">
    <button type="button" class="btn-link" (click)="doNavigate(navigation.NEXT)" [disabled]="nextDisabled()" tabindex="-1">
    <i class="fa fa-chevron-right icon" aria-hidden="true"></i>
  </button>
  </div>
  </div>
  `
})
export class DatepickerNavigationComponent implements OnChanges, OnInit {
    navigation =  NavigationEvent;
    months: number[];
    years: number[] = [];
    i18n: CalenderI18n;
    @Input() config: IDatetimePickerOptions;
    @Input() currentSelected: NgDatetime;
    @Output() navigate = new EventEmitter<NgDatetime>();

    constructor(private calendar: CalendarService, private translationService: TranslateService) {
        this.months = calendar.getMonths();
        this.i18n = this.translationService.getCalenderI18n();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['maxDate'] || changes['minDate'] || changes['date']) {
            this._generateYears();
            this._generateMonths();
        }
    }
    ngOnInit() {
        // this.currentSelected = this.currentSelected || NgDatetime.fromJSDate(new Date());
        this._generateYears();
        this._generateMonths();
    }
    changeMonth(month: string) {
        this.currentSelected.month = toInteger(month);
        this.navigate.emit(new NgDatetime(1, this.currentSelected.month, this.currentSelected.year));
    }

    changeYear(year: string) {
        this.currentSelected.year = toInteger(year);
        this.navigate.emit(new NgDatetime(1, this.currentSelected.month, this.currentSelected.year));
    }

    doNavigate(event: NavigationEvent) {
        switch (event) {
            case NavigationEvent.PREV:
                this.currentSelected = this.calendar.getPrev(this.currentSelected, 'm', 1);
                break;
            case NavigationEvent.NEXT:
                this.currentSelected = this.calendar.getNext(this.currentSelected, 'm', 1);
                break;
        }
        this.navigate.emit(this.currentSelected);
    }

    nextDisabled() {
        const nextDate = this.calendar.getNext(this.currentSelected, 'm');
        const isDisabled = this.config.disabled ||
        (this.config && nextDate.after(this.config.maxDate));

        return isDisabled;
      }

    prevDisabled() {
        const prevDate = this.calendar.getPrev(this.currentSelected, 'm');
        const isDisabled = this.config.disabled ||
         (this.config && prevDate.before(this.config.minDate));
         return isDisabled;
      }

    private _generateMonths() {
        this.months = this.calendar.getMonths();

        if (this.currentSelected && this.config.minDate && this.currentSelected.year === this.config.minDate.year) {
            const index = this.months.findIndex(month => month === this.config.minDate.month);
            this.months = this.months.slice(index);
        }

        if (this.currentSelected && this.config.maxDate && this.currentSelected.year === this.config.maxDate.year) {
            const index = this.months.findIndex(month => month === this.config.maxDate.month);
            this.months = this.months.slice(0, index + 1);
        }
    }

    private _generateYears() {
        this.years = Array.from({ length: 20 }, (e, i) => (this.currentSelected.year - 10) + i);
    }
}
