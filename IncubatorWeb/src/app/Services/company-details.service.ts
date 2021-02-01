import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyDetailsService {

  constructor(private http: HttpClient) { }

  /*
  List<CompanyDetailsVM> GetAllCompanyDetails();
        CompanyDetailsVM GetCompanyById(int id);
        bool ActivateCompany(int id);
        bool DeactivateCompany(int id);
  */
 GetAllCompanyDetails(): Observable<any> {
    return this.http.get('CompanyDetails/GetAllCompanyDetails');
  }
}
