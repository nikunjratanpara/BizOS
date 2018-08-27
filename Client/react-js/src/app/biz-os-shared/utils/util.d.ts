export declare function toString(value: any): string;
export declare function toInteger(value: any): number;
export declare function isInteger(value: any): boolean;
export declare function isNumber(value: any): boolean;
export declare function isDefined(value: any): boolean;
export declare function padNumber(num: string, length: number, padWith?: string): string;
export declare function formatDate(date: string | Date, format: string, srcFormat?: string): string;
export declare function isValidDate(date: string, format?: string): boolean;
export declare const ISODateFormat = "yyyy/MM/dd";
export declare function createJSDateFromString(date: string, format?: string): Date;
export declare function getDatePart(dateObj: object): number;
export declare function getMonthPart(dateObj: object): number;
export declare function getFullYearPart(dateObj: object): number;
export declare function isObject(obj: any): boolean;
export declare function isFunction(fun: any): boolean;
export declare function isUndefined(obj: any): boolean;
export declare function isArray(arr: any): boolean;
export declare function stringify(obj: any): string;
export declare function extend(target: any, source: any, deepCopy?: boolean): any;
