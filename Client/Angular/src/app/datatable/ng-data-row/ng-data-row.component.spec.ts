import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgDataRowComponent } from './ng-data-row.component';

describe('NgDataRowComponent', () => {
  let component: NgDataRowComponent;
  let fixture: ComponentFixture<NgDataRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgDataRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgDataRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
