import { Component, OnInit } from '@angular/core';
import { BaseControlComponent } from '../base-control-component/base.control.component';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-form-radio',
  templateUrl: './form-radio.component.html',
  styleUrls: ['./form-radio.component.scss']
})
export class FormRadioComponent extends BaseControlComponent implements OnInit {

  constructor(fb: FormBuilder) {
    super(fb);
  }

  ngOnInit() {
    this.defaultConfig();
    this.handleOptions();
  }

}
