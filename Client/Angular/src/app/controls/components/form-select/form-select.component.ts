import { Component, OnInit } from '@angular/core';
import { BaseControlComponent } from '../base-control-component/base.control.component';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-form-select',
  templateUrl: './form-select.component.html',
  styleUrls: ['./form-select.component.scss']
})
export class FormSelectComponent extends BaseControlComponent implements OnInit {

  constructor(fb: FormBuilder) {
    super(fb);
  }

  ngOnInit() {
    this.defaultConfig();
    this.handleOptions();
  }
}
