import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormHiddenComponent } from './form-hidden.component';

describe('FormHiddenComponent', () => {
  let component: FormHiddenComponent;
  let fixture: ComponentFixture<FormHiddenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormHiddenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormHiddenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
