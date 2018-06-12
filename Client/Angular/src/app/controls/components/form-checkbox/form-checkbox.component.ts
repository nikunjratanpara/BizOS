import { Component, OnInit, Input } from '@angular/core';
import { BaseControlComponent } from '../base-control-component/base.control.component';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-form-checkbox',
  templateUrl: './form-checkbox.component.html',
  styleUrls: ['./form-checkbox.component.scss']
})
export class FormCheckboxComponent extends BaseControlComponent implements OnInit {

  constructor(fb: FormBuilder) {
    super(fb);
  }

  ngOnInit() {
    this.cssClass = this.cssClass || '  ';
    this.defaultConfig();
  }

}
