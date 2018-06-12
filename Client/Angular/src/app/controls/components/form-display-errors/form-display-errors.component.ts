import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'form-display-errors',
  templateUrl: './form-display-errors.component.html',
  styleUrls: ['./form-display-errors.component.scss']
})
export class FormDisplayErrorsComponent implements OnChanges {

  constructor() { }
  @Input()
  errors: Array<{ errorCode: string, error: string }>;
  ngOnChanges(changes: SimpleChanges) {
    if (changes.errors && !changes.errors.isFirstChange()) {
      this.errors = changes.errors.currentValue;
    }
  }
}
