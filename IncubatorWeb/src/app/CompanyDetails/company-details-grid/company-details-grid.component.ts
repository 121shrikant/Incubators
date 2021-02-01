import { Component, OnInit } from '@angular/core';
import { DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { CompanyDetailsService } from 'src/app/Services/company-details.service';
import { CompanyDetailsVM, UserDetailsVm } from 'src/app/ViewModels';
import { SortDescriptor, State } from '@progress/kendo-data-query';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/Services/shared.service';

@Component({
  selector: 'app-company-details-grid',
  templateUrl: './company-details-grid.component.html',
  styleUrls: ['./company-details-grid.component.css']
})
export class CompanyDetailsGridComponent implements OnInit {

  companyDetailsList = Array<CompanyDetailsVM>();
  public state = <State>{
    skip: 0,
    take: 5,
    sort: Array<SortDescriptor>()
  }; 
  private _subscriptions: Subscription[] = [];
  userDetailsVm = <UserDetailsVm>{};
  constructor(private _companyDetailsService: CompanyDetailsService,
              private _router: Router,
              private _sharedService: SharedService
              ) { }

  ngOnInit(): void {
    this._sharedService.currentUserSubject.subscribe(res => {
      this.userDetailsVm = res;
    });
    this.GetAllCompanyDetails();
  }
  GetAllCompanyDetails() {
    this._subscriptions.push(
      this._companyDetailsService.GetAllCompanyDetails().subscribe(data => {
        this.companyDetailsList = data;
      })
    );
  }
  EditRecord(id: number) {
    this._router.navigate([`CompanyDetails/AddEdit/1/${id}`]);
  }
  AddRecord() {
    this._router.navigate([`CompanyDetails/AddEdit/0`]);
  }

  Deactivate(id: number) {
    this._subscriptions.push(
      this._companyDetailsService.DeactivateCompany(id).subscribe( res => {
        if (res !== null && res) {
          this.GetAllCompanyDetails();
        } else {
          this._sharedService.dataInvalid.next(true);
        }
      })
    );
  }

  Activate(id: number) {
    this._subscriptions.push(
      this._companyDetailsService.ActivateCompany(id).subscribe( res => {
        if (res !== null && res) {
          this.GetAllCompanyDetails();
        } else {
          this._sharedService.dataInvalid.next(true);
        }
      })
    );
  }

  public dataStateChange(state: DataStateChangeEvent): void {
      this.state = state;
  } 

}
