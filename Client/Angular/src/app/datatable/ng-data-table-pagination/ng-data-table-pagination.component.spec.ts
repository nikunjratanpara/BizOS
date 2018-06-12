import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgDataTablePaginationComponent } from './ng-data-table-pagination.component';

describe('NgDataTablePaginationComponent', () => {
  let component: NgDataTablePaginationComponent;
  let fixture: ComponentFixture<NgDataTablePaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgDataTablePaginationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgDataTablePaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
