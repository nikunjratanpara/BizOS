import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NgDatetime } from './datetime.struct';

export class MonthViewModel {
  calender: Array<Array<NgDatetime>>;
  constructor(public month: number, public year: number) {
    this.calender = [];
  }
}

export type NgbPeriod = 'y' | 'm' | 'd';

@Injectable()
export class CalendarService {
  private months: Array<MonthViewModel>;
  public $model: BehaviorSubject<MonthViewModel> = new BehaviorSubject<MonthViewModel>(null);
  constructor() {
    this.months = [];
  }
  public getMonths(): Array<number> {
    return Array.from({ length: 12 }, (v, i) => i + 1);
  }
  public getDaysPerWeek(): number { return 7; }
  public getWeeksPerMonth(): number { return 6; }
  public getMonth(month: number, year: number): MonthViewModel {
    let monthViewModel: MonthViewModel;
    const filteredMonthModel = this.months.filter(monthModel => monthModel.month === month && monthModel.year === year);
    if (filteredMonthModel && filteredMonthModel.length > 0) {
      monthViewModel = filteredMonthModel[0];
    } else {
      monthViewModel = this.buildMonth(month, year);
    }
    return monthViewModel;
  }
  public getPrev(date: NgDatetime, period: NgbPeriod = 'd', number = 1) {
    return this.getNext(date, period, number * -1);
  }
  public getNext(date: NgDatetime, period: NgbPeriod = 'd', number = 1) {
    let jsDate = NgDatetime.toJSDate(date);

    switch (period) {
      case 'y':
        return new NgDatetime(date.year + number, 1, 1);
      case 'm':
        jsDate = new Date(date.year, date.month + number - 1, 1, 12);
        break;
      case 'd':
        jsDate.setDate(jsDate.getDate() + number);
        break;
      default:
        return date;
    }

    return NgDatetime.fromJSDate(jsDate);
  }

  private buildMonth(month: number, year: number): MonthViewModel {
    const monthViewModel: MonthViewModel = new MonthViewModel(month, year);
    let week = new Array(7);
    const firstDate = new Date(year, month - 1, 1);
    const lastDate = new Date(year, month, 0);
    let startWeekDay = firstDate.getDay(); // Array start from 0
    const maxDays = lastDate.getDate();
    const weekDays = 6;
    let isLastWeekAdded = false;
    for (let day = 1; day <= maxDays; day++) {
      isLastWeekAdded = false;
      week[startWeekDay] = new NgDatetime(day, month, year);
      if (startWeekDay >= weekDays) {
        isLastWeekAdded = true;
        monthViewModel.calender.push(week);
        week = new Array(7);
        startWeekDay = -1;
      }
      startWeekDay++;
    }
    if (!isLastWeekAdded) {
      monthViewModel.calender.push(week);
    }
    this.months.push(monthViewModel);
    return monthViewModel;
  }
}
