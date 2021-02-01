import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CompanyStageEnum, RoleTypeEnum } from 'src/app/Enums';
import { CompanyDetailsService } from 'src/app/Services/company-details.service';
import { SharedService } from 'src/app/Services/shared.service';
import { CompanyDetailsVM, UserDetailsVm } from 'src/app/ViewModels';

@Component({
  selector: 'app-add-edit-company-details',
  templateUrl: './add-edit-company-details.component.html',
  styleUrls: ['./add-edit-company-details.component.css']
})
export class AddEditCompanyDetailsComponent implements OnInit {

  addEditForm: FormGroup;
  title = '';
  saveBtnText = '';
  formLoad = false;
  isEdit: boolean = false;
  userId = 0;
  userDetails = <UserDetailsVm>{};
  finalData = <CompanyDetailsVM>{};
  oldData = <CompanyDetailsVM>{};
  StageDefaultItem = { value: null, text: '-- Select --'};
  Stagedata = [
    { value: CompanyStageEnum.IdeaStage, text: 'Idea Stage'}, 
    { value: CompanyStageEnum.PrototypeDeveloped, text: 'Prototype Developed'}, 
    { value: CompanyStageEnum.PrivateBeta, text: 'Private Beta'}, 
    { value: CompanyStageEnum.PublicBeta, text: 'Public Beta'}, 
    { value: CompanyStageEnum.Launched, text: 'Launched'}, 
    { value: CompanyStageEnum.Revenuegreaterthan10Lakhs, text: 'Revenue greater than Rs. 10 Lakhs over past year'}, 
  ];
  private _subscriptions: Subscription[] = [];

  constructor(private _sharedService: SharedService, private _route: ActivatedRoute, private _router: Router, fb: FormBuilder, private _companyDetailsService: CompanyDetailsService) {
    this.addEditForm = fb.group({
      CompanyStatus:[1, [Validators.required]],
      CompanyName:['', [Validators.required, Validators.maxLength(200), Validators.pattern('[a-zA-Z]+[a-zA-Z\\s]*')]],
      ManagingPartner:['', [Validators.required, Validators.maxLength(50), Validators.pattern('[a-zA-Z]+[a-zA-Z\\s]*')]],
      LaunchedYear:['', [Validators.required, Validators.min(0), Validators.max(9999)]],
      Stage:['', [Validators.required]],
      NumberOfMembers:['', [Validators.required, Validators.min(0), Validators.max(99999999)]],
      WebSite:['', [Validators.maxLength(50), Validators.pattern('[a-zA-Z]+.*')]],
      Email:['', [Validators.required, Validators.maxLength(50), Validators.pattern('([a-zA-Z0-9]+([._-][a-zA-Z0-9]+)*)@[a-zA-Z0-9]+(\.[a-zA-Z]{2,3}){1}(?:\.[a-zA-Z]{2,3})?')]],
      Phone:['', [Validators.required, Validators.pattern('[1-9][0-9]{9}')]],
      Country:['', [Validators.required, Validators.maxLength(80), Validators.pattern('[a-zA-Z]+')]],
      City:['', [Validators.required, Validators.maxLength(80), Validators.pattern('[a-zA-Z]+')]],
      Pincode:['', [Validators.required, Validators.pattern('[0-9]{6}')]],
    });
    this._sharedService.currentUserSubject.subscribe(details => this.userDetails = details);
    this._route.params.subscribe(res => {
      this.userId = res.id === undefined || res.id === null ? 0 : +res.id;
      this.isEdit = !(res.id === undefined || res.id === null ) && +res.isEdit === 1 ? true : false;     
      this.title = this.isEdit ? 'Edit Company Details' : 'Add Company Details';
      this.saveBtnText = this.isEdit ? 'Save Changes' : 'Save';
    });

  }

  ngOnInit(): void {
    if (this.isEdit) {
      this.serviceCall();
    }
    this.formLoad = true;
  }

  serviceCall() {
    this._subscriptions.push(
      this._companyDetailsService.GetCompanyById(this.userId).subscribe( res => {
        if (res !== null && res) {
          this.oldData = JSON.parse(JSON.stringify(res));
          this.SetDataForEdit();
        } else {
          this._sharedService.dataInvalid.next(true);
        }

      })
    );
  }
  SetDataForEdit() {
    this.addEditForm.patchValue({
      CompanyStatus:    this.oldData.CompanyStatus, 
      CompanyName:      this.oldData.CompanyName, 
      ManagingPartner:  this.oldData.ManagingPartner, 
      LaunchedYear:     this.oldData.LaunchedYear, 
      Stage:            this.oldData.Stage, 
      NumberOfMembers:  this.oldData.NumberOfMembers, 
      WebSite:          this.oldData.WebSite, 
      Email:            this.oldData.Email, 
      Phone:            this.oldData.Phone, 
      Country:          this.oldData.Country, 
      City:             this.oldData.City, 
      Pincode:          this.oldData.Pincode,
    });
  }

  public CheckError(id: string): boolean {
    let error = true;
    const field = this.addEditForm.get(id);
    if (field != null) {
      error = field.invalid
    }    
    return error;
  }
  SetMobelValue() {
    this.finalData = <CompanyDetailsVM>{
      Id: 0,
      CompanyStatus:    this.addEditForm.controls['CompanyStatus'].value, 
      CompanyName:      this.addEditForm.controls['CompanyName'].value, 
      ManagingPartner:  this.addEditForm.controls['ManagingPartner'].value, 
      LaunchedYear:     this.addEditForm.controls['LaunchedYear'].value, 
      Stage:            this.addEditForm.controls['Stage'].value, 
      NumberOfMembers:  this.addEditForm.controls['NumberOfMembers'].value, 
      WebSite:          this.addEditForm.controls['WebSite'].value, 
      Email:            this.addEditForm.controls['Email'].value, 
      Phone:            this.addEditForm.controls['Phone'].value, 
      Country:             this.addEditForm.controls['Country'].value, 
      City:             this.addEditForm.controls['City'].value, 
      Pincode:          this.addEditForm.controls['Pincode'].value
    };
    if (this.isEdit) {
      this.finalData.Id = this.oldData.Id;
    } else {
      this.finalData.CreatedBy = this.userDetails.Id;
    }
    if (this.userDetails.RoleType !== RoleTypeEnum.Admin) {
      this.finalData.CompanyStatus = this.oldData.CompanyStatus;
    }
  }
  Cancel() {
    this._router.navigate(['']);
  }

  Action() {
    if (this.addEditForm.valid) {
      this.SetMobelValue();
      if (this.isEdit) {
        this.Update();
      } else {
        this.Save();
      }
    }
  }
  Save() {
    this._subscriptions.push(
      this._companyDetailsService.AddCompany(this.finalData).subscribe( res => {
        if (res !== null && res) {
          this.Cancel();
        } else {
          this._sharedService.dataInvalid.next(true);
        }
      })
    );
  }

  Update() {
    this._subscriptions.push(
      this._companyDetailsService.UpdateCompany(this.finalData).subscribe( res => {
        if (res !== null && res) {
          this.Cancel();
        } else {
          this._sharedService.dataInvalid.next(true);
        }
      })
    );
  }

  ngOnDestroy() {
    this._subscriptions.forEach(x => x.unsubscribe());
  }

}
