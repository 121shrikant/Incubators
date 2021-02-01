import { Component, OnInit } from '@angular/core';
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
  showSpinner = false;

  constructor(private spinnerService: SpinnerService, private _sharedService: SharedService) {
    let userData = null;
    const tempData = localStorage.getItem('currentUser');
    if (tempData === null) {
      userData = <UserDetailsVm>{};
    } else {
      userData = JSON.parse(tempData);
    }
    this._sharedService.currentUserSubject.next(userData);
  }
  ngOnInit(): void {
    setTimeout(() => {
      this.spinnerService.isSpinning.subscribe(val => {
        this.showSpinner = val;
      });
    }, 0);
  }
}
