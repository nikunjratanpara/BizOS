import * as moment from 'moment';
import memoizefn from 'src/utils/memoize';

import { MonthViewModel } from './MonthViewModel';

export type DatePeriod = 'd' | 'M' | 'y';
export function getMonths(): number[] {
  return Array.from({ length: 12 }, (v, i) => i + 1);
}

export function getDaysPerWeek(): number { return 7; }
export function getWeeksPerMonth(): number { return 6; }

export const getMonth = memoizefn((month: number, year: number): MonthViewModel => {
  const monthViewModel: MonthViewModel = new MonthViewModel(month, year);
  let week = new Array(7);
  const firstDate = new Date(year, month - 1, 1);
  const lastDate = new Date(year, month, 0);
  let startWeekDay = firstDate.getDay(); // Array start from 0
  const maxDays = lastDate.getDate();
  const weekDays = 6;
  let isLastWeekAdded = false;
  if(startWeekDay!==0){
    let previousMonthLastDate = new Date(year,month - 1,0)
    for(let index= startWeekDay - 1; index>=0; index--) {
      week[index] = moment(previousMonthLastDate).clone().toDate();
      previousMonthLastDate = new Date(previousMonthLastDate.setDate(previousMonthLastDate.getDate()-1));
    }
  }
  for (let day = 1; day <= maxDays; day++) {
    isLastWeekAdded = false;
    week[startWeekDay] = new Date(year, month - 1, day);
    if (startWeekDay >= weekDays) {
      isLastWeekAdded = true;
      monthViewModel.calender.push(week);
      week = new Array(7);
      startWeekDay = -1;
    }
    startWeekDay++;
  }
  if(startWeekDay !== weekDays) {
    let nextMonthLastDate = new Date(year,month,1)
    for(let index= startWeekDay; index<=weekDays; index++) {
      week[index] = moment(nextMonthLastDate).clone().toDate();
      nextMonthLastDate = new Date(nextMonthLastDate.setDate(nextMonthLastDate.getDate() + 1));
    }
  }
  if (!isLastWeekAdded) {
    monthViewModel.calender.push(week);
  }
  return monthViewModel;
});
export function getPrev(date: Date, period: DatePeriod = 'd', n = 1) {
  return getNext(date, period, n * -1);
}
export function getNext(date: Date, period: DatePeriod = 'd', n = 1): Date {
  return moment(date).add(n, period).toDate();
}

