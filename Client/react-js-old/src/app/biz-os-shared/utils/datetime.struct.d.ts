export declare class NgDatetime {
    day: number;
    month: number;
    year: number;
    hour?: number;
    minutes?: number;
    seconds?: number;
    static today: NgDatetime;
    constructor(day: number, month: number, year: number, hour?: number, minutes?: number, seconds?: number);
    static fromJSDate(date: Date): NgDatetime;
    static toJSDate(date: NgDatetime): Date;
    isValidDate(): boolean;
    format(format: string): string;
    after(other: NgDatetime): boolean;
    before(other: NgDatetime): boolean;
    equals(other: NgDatetime): boolean;
}
export declare enum NavigationEvent {
    PREV = 0,
    NEXT = 1
}
export interface IDatetimePickerOptions {
    disabled?: boolean;
    maxDate?: NgDatetime;
    minDate?: NgDatetime;
    displayFormat?: string;
}
