import { Component, OnInit } from '@angular/core';
import { BaseControlComponent } from '../base-control-component/base.control.component';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-form-button',
  templateUrl: './form-button.component.html',
  styleUrls: ['./form-button.component.scss']
})
export class FormButtonComponent extends BaseControlComponent implements OnInit {

  constructor(fb: FormBuilder) {
    super(fb);
  }
  ngOnInit() {
    this.cssClass = this.cssClass || 'btn btn-default';
    this.defaultConfig();
  }
}
