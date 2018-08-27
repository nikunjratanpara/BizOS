import { Component, OnInit, forwardRef, HostListener } from '@angular/core';
import { BaseControlComponent } from '../base-control-component/base.control.component';
import { NG_VALUE_ACCESSOR, FormBuilder } from '@angular/forms';
import { Observable, Subject, merge, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { CatalogData, CatalogFilterOption, DataComboService, ComboDisplayStyle, Key } from '../../../biz-os-shared';

export const DATA_COMBO_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FormDataComboComponent),
  multi: true
};
@Component({
  selector: 'app-form-data-combo',
  templateUrl: './form-data-combo.component.html',
  styleUrls: ['./form-data-combo.component.scss'],
  providers: [DATA_COMBO_CONTROL_VALUE_ACCESSOR]
})
export class FormDataComboComponent extends BaseControlComponent implements OnInit {

  options: any;
  format: (comboItem: CatalogData) => string;
  value: CatalogData;
  optionProvider: Observable<CatalogFilterOption>;
  allOptionProvider: Subject<CatalogFilterOption> = new Subject<CatalogFilterOption>();
  constructor(private dataComboService: DataComboService, fb: FormBuilder) {
    super(fb);
  }
  @HostListener('keydown', ['$event'])
  handleKeyboardNavigation(event: KeyboardEvent) {
    if (event.altKey && event.keyCode === Key.ArrowDown) {
      this.showAllOptions();
    }
  }
  ngOnInit() {
    this.initTypeaheadOptions();
  }
  private initTypeaheadOptions(): void {
    this.options = {
      highlight: true,
      hint: true
    };
    this.format = this.formatter(this.typeaheadOptions.displayStyle);
  }
  public search = (query: Observable<CatalogFilterOption>): Observable<CatalogData[]> => {
    this.optionProvider = query;
     return merge(this.optionProvider, this.allOptionProvider.asObservable()).pipe(
     debounceTime(300),
     distinctUntilChanged(),
     switchMap((option: CatalogFilterOption) => {
      return this.getOptions(option);
    }));
  }
public showAllOptions() {
  if  (!this.isDisabled()) {
    this.allOptionProvider.next({term: '', showAll: true});
  }
}
private getOptions(option: CatalogFilterOption) {
  if (option) {
    if (typeof(option) === 'string') {
      option = {term: option, showAll: false};
    }
    return this.dataComboService.getCatalogData({ catalogId: this.typeaheadOptions.catId, filter: option });
  } else {
    return of([]);
  }
}
  private formatter(comboDisplayStyle: ComboDisplayStyle): (comboItem: CatalogData) => string {
    const formatfun: Array<(comboItem: CatalogData) => string> = [];
    formatfun[ComboDisplayStyle.code] = (comboItem: CatalogData): string => {
      return comboItem.code;
    };
    formatfun[ComboDisplayStyle.description] = (comboItem: CatalogData): string => {
      return comboItem.description;
    };
    formatfun[ComboDisplayStyle.codeDesciption] = (comboItem: CatalogData): string => {
      return comboItem.code + ' - ' + comboItem.description;
    };
    return formatfun[comboDisplayStyle];
  }
}
