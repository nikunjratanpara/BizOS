import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgDataHeaderCellComponent } from './ng-data-header-cell.component';

describe('NgDataHeaderCellComponent', () => {
  let component: NgDataHeaderCellComponent;
  let fixture: ComponentFixture<NgDataHeaderCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgDataHeaderCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgDataHeaderCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
