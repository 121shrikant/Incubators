import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from './Services/shared.service';
import { SpinnerService } from './Services/spinner.service';
import { UserDetailsVm } from './ViewModels';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'IncubatorWeb';
  dataInvalid = false;
  userData = <UserDetailsVm>{};
  constructor( private _sharedService: SharedService, private _router: Router, private _activatedRoute: ActivatedRoute) {
    const tempData = localStorage.getItem('currentUser');
    if (tempData === null) {
      this.userData = <UserDetailsVm>{};
    } else {
      this.userData = JSON.parse(tempData);
    }
    this._sharedService.currentUserSubject.next(this.userData);
  }
  ngOnInit(): void {
    this._sharedService.currentUserSubject.subscribe(x => this.userData = x); 
    this._sharedService.dataInvalid.subscribe(val => {
      this.dataInvalid = val;
      if (val) {
        alert('Data Not found');
        this._router.navigate([''], { relativeTo: this._activatedRoute });
        this._sharedService.dataInvalid.next(false);
      }
    });
  }

  validUser() {
    return this.userData.UserName != null && this.userData.UserName != undefined;
  }
  logoutAndNavigate() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this._sharedService.currentUserSubject.next(<UserDetailsVm>{});
    this._router.navigate(['login']);
  }
}
