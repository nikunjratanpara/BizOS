import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgDataFootComponent } from './ng-data-foot.component';

describe('NgDataFootComponent', () => {
  let component: NgDataFootComponent;
  let fixture: ComponentFixture<NgDataFootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgDataFootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgDataFootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
