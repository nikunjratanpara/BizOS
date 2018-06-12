import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CatalogFormComponent } from './catalog-form.component';


describe('TestFormComponent', () => {
  let component: CatalogFormComponent;
  let fixture: ComponentFixture<CatalogFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
