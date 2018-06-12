import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDataComboComponent } from './form-data-combo.component';

describe('FormDataComboComponent', () => {
  let component: FormDataComboComponent;
  let fixture: ComponentFixture<FormDataComboComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDataComboComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDataComboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
