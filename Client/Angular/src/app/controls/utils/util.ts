import { NgDatetime } from '../components/ng-datetime/datetime.struct';
export function toString(value: any): string {
  return isDefined(value) ? `${value}` : '';
}
export function toInteger(value: any): number {
  return parseInt(`${value}`, 10);
}
export function isInteger(value: any): boolean {
  return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
}
export function isNumber(value: any): boolean {
  return typeof value === 'number' && !isNaN(value);
}
export function isDefined(value: any): boolean {
  return value !== undefined && value !== null;
}
export function padNumber(number: string, length: number, padWith: string = '0'): string {
  return new Array(length - (number.length - 1)).join('0') + number;
}


export function formatDate(date: string | Date, format: string, srcFormat: string = ''): string {
  if (srcFormat && typeof(date) === 'string') {
    if (isValidDate(date, srcFormat)) {

    }
  } else {
    return NgDatetime.fromJSDate(date as Date).format(format);
  }
}
export function isValidDate(date: string, format?: string) {
  const separators = [' ', '-', '\\.', '/'];
  const dateSplitter = new RegExp(separators.join('|'), 'g');
  let isValid = !!date;
  if (!format) {
    format = 'dd/MM/yyyy';
  }
  isValid = isValid && format.length === date.length;
  if (isValid) {
    const dateArr = date.split(dateSplitter);
    const formatArr = format.split(dateSplitter);
    if (dateArr.length === formatArr.length) {
      const dateObj = {};
      formatArr.forEach((formatPart, index) => {
        dateObj[formatPart] = dateArr[index];
      });
      const dateStruct = new NgDatetime(getDatePart(dateObj), getMonthPart(dateObj), getFullYearPart(dateObj));

      const jsDate = NgDatetime.toJSDate(dateStruct);

      isValid = jsDate.getDate() === dateStruct.day &&
        jsDate.getMonth() === dateStruct.month - 1 &&
        jsDate.getFullYear() === dateStruct.year;

    } else {
      isValid = false;
    }
  }
  return isValid;
}
export const ISODateFormat = 'yyyy/MM/dd';
export function createJSDateFromString(date: string, format?: string) {
  let jsDate = null;
  format = format || ISODateFormat;
  if (isValidDate(date, format)) {
    const separators = [' ', '-', '\\.', '/'];
    const dateSplitter = new RegExp(separators.join('|'), 'g');
    const dateArr = date.split(dateSplitter);
    const formatArr = format.split(dateSplitter);
    const dateObj = {};
    formatArr.forEach((formatPart, index) => {
      dateObj[formatPart] = dateArr[index];
    });
    const dateStruct = new NgDatetime(getDatePart(dateObj), getMonthPart(dateObj), getFullYearPart(dateObj));
    jsDate = NgDatetime.toJSDate(dateStruct);
  }
  return jsDate;
}
export function getDatePart(dateObj: object): number {
  let datePart = dateObj['dd'] || dateObj['d'];
  if (datePart) {
    datePart = parseInt(datePart, 10);
  }
  return datePart;
}
export function getMonthPart(dateObj: object): number {
  let monthPart = dateObj['MM'] || dateObj['M'];
  if (monthPart) {
    monthPart = parseInt(monthPart, 10);
  }
  return monthPart;
}
export function getFullYearPart(dateObj: object): number {
  let yearPart = dateObj['yyyy'] || dateObj['yy'];
  if (yearPart) {
    yearPart = parseInt(yearPart, 10);
  }
  return yearPart;
}

export function isObject(obj: any): boolean {
  return typeof obj === 'object';
}
export function isFunction(fun: any): boolean {
  return typeof fun === 'function';
}
export function isUndefined(obj: any): boolean {
  return typeof obj === 'undefined';
}
export function isArray(arr: any): boolean {
  return !this.isUndefined(arr) && Array.isArray(arr);
}
export function stringify(obj: any): string {
  let attr = '';
  if (obj) {
    attr = JSON.stringify(obj);
    /* for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        attr += key + ' = ' + obj[key];
      }
    } */
  }
  return attr;
}
export function extend(target: any, source: any, deepCopy: boolean = false): any {
  if (!target) {
    target = {};
  }
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      if (deepCopy && isObject(source[key])) {
        target[key] = extend(target[key], source[key], deepCopy);
      } else {
        target[key] = source[key];
      }
    }
  }
  // Return the modified object
  return target;
}
