import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyDetailsGridComponent } from './company-details-grid.component';

describe('CompanyDetailsGridComponent', () => {
  let component: CompanyDetailsGridComponent;
  let fixture: ComponentFixture<CompanyDetailsGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyDetailsGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyDetailsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
