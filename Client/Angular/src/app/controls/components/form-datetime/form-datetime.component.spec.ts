import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDatetimeComponent } from './form-datetime.component';

describe('FormDatetimeComponent', () => {
  let component: FormDatetimeComponent;
  let fixture: ComponentFixture<FormDatetimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDatetimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDatetimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
