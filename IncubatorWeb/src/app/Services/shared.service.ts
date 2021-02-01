import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { UserDetailsVm } from '../ViewModels';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  currentUserSubject = new BehaviorSubject<UserDetailsVm>(<UserDetailsVm>{});
  dataInvalid = new BehaviorSubject<boolean>(false);
  isUserLoggedIn = false;
  constructor() {
    this.currentUserSubject.subscribe( x => this.isUserLoggedIn = x.UserName != null && x.UserName != undefined);
  }

}
