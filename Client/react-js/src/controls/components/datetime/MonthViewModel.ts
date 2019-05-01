export class MonthViewModel {
  public calender: Date[][];
  constructor(public month: number, public year: number) {
    this.calender = [];
  }
}