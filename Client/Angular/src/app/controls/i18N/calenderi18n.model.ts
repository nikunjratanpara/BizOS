export class CalenderI18n {
  datefmt: 'dd/MM/yyyy';
  monthShortNames: Array<string>;
  monthFullNames: Array<string>;
  weekDaysShortName: Array<string>;
}
export class DefaultsI18n {
  align: 'left'|'right';
  thousandSeparator: string;
  decimalSeparator: string;
  decimalPlaces: number;
}
export interface I18N {
  calender: CalenderI18n;
  defaults: DefaultsI18n;
  token: {};
}
