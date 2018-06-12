import { Component, OnInit } from '@angular/core';
import { BaseControlComponent } from '../base-control-component/base.control.component';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-form-hidden',
  templateUrl: './form-hidden.component.html',
  styleUrls: ['./form-hidden.component.scss']
})
export class FormHiddenComponent extends BaseControlComponent {

  constructor(fb: FormBuilder) {
    super(fb);
   }
}
