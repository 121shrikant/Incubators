import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCompanyDetailsComponent } from './add-edit-company-details.component';

describe('AddEditCompanyDetailsComponent', () => {
  let component: AddEditCompanyDetailsComponent;
  let fixture: ComponentFixture<AddEditCompanyDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditCompanyDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditCompanyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
