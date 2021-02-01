import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { AuthenticationService } from '../Services/Authentication.service';
import { SharedService } from '../Services/shared.service';
import { LoginDetails, UserDetailsVm } from '../ViewModels';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  loginForm: FormGroup;
  private _subscriptions: Subscription[] = [];



  constructor(private authenticationService: AuthenticationService, private _sharedService: SharedService, fb: FormBuilder) {
    this.loginForm = fb.group({
      userName:['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      password:['', [Validators.required]]
    });

  }

  ngOnInit(): void {
    
  }
  onSubmit() {
    if(this.loginForm.valid) {
      
    }
  }

  login() {
    console.log('loginForm: ', this.loginForm);
    
    if(this.loginForm.valid) {
      const _username = this.loginForm.controls['userName'].value;
      const _password = this.loginForm.controls['password'].value;
      const loginDetails = <LoginDetails>{
        UserName: _username,
        Password: _password
      };
      this._subscriptions.push(
        this.authenticationService.Login(loginDetails).subscribe(user => {
          user.authdata = window.btoa(_username + ':' + _password);
          localStorage.setItem('currentUser', JSON.stringify(user));
          this._sharedService.currentUserSubject.next(user);
        })
      );
    }
  }

  logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');
      this._sharedService.currentUserSubject.next(<UserDetailsVm>{});
  }

  ngOnDestroy() {
    this._subscriptions.forEach(x => x.unsubscribe());
  }
}
