import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgDataBodyComponent } from './ng-data-body.component';

describe('NgDataBodyComponent', () => {
  let component: NgDataBodyComponent;
  let fixture: ComponentFixture<NgDataBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgDataBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgDataBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
