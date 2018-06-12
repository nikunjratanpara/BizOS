import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgDataCellComponent } from './ng-data-cell.component';

describe('NgDataCellComponent', () => {
  let component: NgDataCellComponent;
  let fixture: ComponentFixture<NgDataCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgDataCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgDataCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
