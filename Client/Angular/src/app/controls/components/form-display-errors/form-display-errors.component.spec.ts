import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDisplayErrorsComponent } from './form-display-errors.component';

describe('FormDisplayErrorsComponent', () => {
  let component: FormDisplayErrorsComponent;
  let fixture: ComponentFixture<FormDisplayErrorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDisplayErrorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDisplayErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
