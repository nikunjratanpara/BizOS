import { Component } from '@angular/core';
import { BaseControlComponent } from '../base-control-component/base.control.component';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss']
})
export class FormInputComponent extends BaseControlComponent {
  constructor(fb: FormBuilder) {
    super(fb);
   }
}
