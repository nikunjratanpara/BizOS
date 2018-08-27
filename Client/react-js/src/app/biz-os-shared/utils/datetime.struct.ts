import { padNumber } from '..';

export class NgDatetime {
    static today = NgDatetime.fromJSDate(new Date());
    constructor(public day: number, public month: number, public year: number,
            public hour?: number, public minutes?: number, public seconds?: number) {}
    static fromJSDate(date: Date): NgDatetime {
        if (date) {
            return new NgDatetime(date.getDate(), date.getMonth() + 1, date.getFullYear());
        } else {
            return new NgDatetime(0, 0, 0);
        }
    }
    /* static fromString(date: string, srcFormat: string = ISODateFormat) {
        if (date && date.length === srcFormat.length) {
            return new NgDatetime(date.getDate(), date.getMonth() + 1, date.getFullYear());
        } else {
            return new NgDatetime(0, 0, 0);
        }
    } */
    static toJSDate(date: NgDatetime): Date {
        return new Date(date.year, date.month - 1, date.day);
    }
    isValidDate(): boolean {
       const jsDate: Date = NgDatetime.toJSDate(this);

       return  jsDate.getDate() === this.day &&
       jsDate.getMonth() + 1 === this.month - 1 &&
       jsDate.getFullYear() === this.year;
    }
    format(format: string): string {
        if ( format.includes('dd')) {
            format = format.replace('dd', padNumber(this.day.toString(), 2));
        } else if ( format.includes('d')) {
            format = format.replace('d', this.day.toString());
        }

        if ( format.includes('MM')) {
            format = format.replace('MM', padNumber(this.month.toString(), 2));
        } else if ( format.includes('M')) {
            format = format.replace('M', this.month.toString());
        }

        if ( format.includes('yyyy')) {
           format = format.replace('yyyy', this.year.toString());
        } else if ( format.includes('yy')) {
           format = format.replace('yy', this.year.toString().substring(2, 3));
        }
        return format;
    }
    after(other: NgDatetime) {
        if (!other) {
            return false;
        }
        if (this.year === other.year) {
            if (this.month === other.month) {
                return this.day === other.day ? false : this.day > other.day;
            } else {
               return this.month > other.month;
            }
        } else {
            return this.year > other.year;
        }
    }
    before(other: NgDatetime) {
        if (!other) {
            return false;
        }
        if (this.year === other.year) {
            if (this.month === other.month) {
                return this.day < other.day;
            } else {
                return this.month < other.month;
            }
        } else {
            return this.year < other.year;
        }
    }
    equals(other: NgDatetime) {
        return other && this.year === other.year && this.month === other.month && this.day === other.day;
    }
}

export enum NavigationEvent {
    PREV,
    NEXT
  }

export interface IDatetimePickerOptions {
    disabled?: boolean;
    maxDate?: NgDatetime;
    minDate?: NgDatetime;
    displayFormat?: string;
  }
