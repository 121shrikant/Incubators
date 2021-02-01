import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CompanyDetailsVM } from '../ViewModels';

@Injectable({
  providedIn: 'root'
})
export class CompanyDetailsService {

  constructor(private http: HttpClient) { }

  GetAllCompanyDetails(): Observable<any> {
    return this.http.get('CompanyDetails/GetAllCompanyDetails');
  }

  GetCompanyById(id: number): Observable<any> {
    return this.http.get('CompanyDetails/GetCompanyById/' + id );
  }

  AddCompany(data: CompanyDetailsVM): Observable<any> {
    return this.http.post('CompanyDetails/AddCompany', data);
  }

  UpdateCompany(data: CompanyDetailsVM): Observable<any> {
    return this.http.put('CompanyDetails/UpdateCompany', data);
  }

  ActivateCompany(id: number): Observable<any> {
    return this.http.put('CompanyDetails/ActivateCompany/', id );
  }
  DeactivateCompany(id: number): Observable<any> {
    return this.http.put('CompanyDetails/DeactivateCompany/', id );
  }
}
