import { Component, OnInit, forwardRef } from '@angular/core';
import { BaseControlComponent } from '../base-control-component/base.control.component';
import { BehaviorSubject } from 'rxjs';
import { NG_VALUE_ACCESSOR, FormBuilder } from '@angular/forms';

export const DATE_PICKER_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FormDatetimeComponent),
  multi: true
};

@Component({
  selector: 'app-form-datetime',
  templateUrl: './form-datetime.component.html',
  styleUrls: ['./form-datetime.component.scss'],
  providers: [ DATE_PICKER_CONTROL_VALUE_ACCESSOR]
})
export class FormDatetimeComponent extends BaseControlComponent implements OnInit {

  value: any;
  toggelOpen: BehaviorSubject<boolean>;
  constructor(fb: FormBuilder) {
    super(fb);
  }

  ngOnInit() {
    this.toggelOpen = new BehaviorSubject<boolean>(null);
    console.dir(this.group);
  }
  openDatepicker() {
    if (!this.isDisabled()) {
      this.toggelOpen.next(true);
    }
  }
}
