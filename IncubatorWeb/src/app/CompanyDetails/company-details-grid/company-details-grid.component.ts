import { Component, OnInit } from '@angular/core';
import { DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { CompanyDetailsService } from 'src/app/Services/company-details.service';
import { CompanyDetailsVM } from 'src/app/ViewModels';
import { State } from '@progress/kendo-data-query';

@Component({
  selector: 'app-company-details-grid',
  templateUrl: './company-details-grid.component.html',
  styleUrls: ['./company-details-grid.component.css']
})
export class CompanyDetailsGridComponent implements OnInit {

  companyDetailsList = Array<CompanyDetailsVM>();
  constructor(private _companyDetailsService: CompanyDetailsService) { }

  public state: State = {
    skip: 0,
    take: 5
  }; 
  ngOnInit(): void {
    // this._companyDetailsService.GetAllCompanyDetails().subscribe(data => {
    //   this.companyDetailsList = data;
    // });
    this.companyDetailsList.push(<any>{

      City: "Delhi"
      , CompanyName: "Samsung"
      , CompanyStatus: 1
      , Country: "India"
      , CreatedBy: 1
      , Email: "Samsung@gmail.com"
      , Id: 1
      , LaunchedYear: 2020
      , ManagingPartner: "suresh"
      , NumberOfMembers: 15
      , Phone: "9876543210"
      , Pincode: 422007
      , Stage: 5
      , WebSite: "www.Samsung.com"
    });
  }

  public dataStateChange(state: DataStateChangeEvent): void {
      this.state = state;
  } 

}
