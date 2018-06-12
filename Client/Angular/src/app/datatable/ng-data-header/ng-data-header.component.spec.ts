import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgDataHeaderComponent } from './ng-data-header.component';

describe('NgDataHeaderComponent', () => {
  let component: NgDataHeaderComponent;
  let fixture: ComponentFixture<NgDataHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgDataHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgDataHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
