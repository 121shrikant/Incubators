import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { UserDetailsVm } from '../ViewModels';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  currentUserSubject = new BehaviorSubject<UserDetailsVm>(<UserDetailsVm>{});
  isUserLoggedIn = false;
  constructor() {

  }

}
