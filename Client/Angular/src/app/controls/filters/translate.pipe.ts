import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '../services/translate.service';

@Pipe({
  name: 'translate',
  pure: false // impure pipe, update value when we change language
})
export class TranslatePipe implements PipeTransform {

  constructor(private translate: TranslateService){}
  transform(value: any, args?: any): any {
    if (!value) { return; }
    if (args) {
      return this.translate.format(value, args);
    } else {
      return this.translate.instant(value);
    }
  }

}
