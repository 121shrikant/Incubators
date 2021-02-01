import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  showErrorMsg = false;



  constructor(private authenticationService: AuthenticationService,
             private _sharedService: SharedService, 
             fb: FormBuilder,
             private _router: Router) {
    this.loginForm = fb.group({
      userName:['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      password:['', [Validators.required]]
    });

  }

  ngOnInit(): void {
    
  }

  login() {    
    if(this.loginForm.valid) {
      this.showErrorMsg = false;
      const _username = this.loginForm.controls['userName'].value;
      const _password = this.loginForm.controls['password'].value;
      const loginDetails = <LoginDetails>{
        UserName: _username,
        Password: _password
      };
      this._subscriptions.push(
        this.authenticationService.Login(loginDetails).subscribe(user => {
          if (user == null || user.UserName == null) {
            this.showErrorMsg = true;
          } else {
            user.authdata = window.btoa(_username + ':' + _password);
            localStorage.setItem('currentUser', JSON.stringify(user));
            this._sharedService.currentUserSubject.next(user);
            this._router.navigate(['']);
          }
        })
      );
    }
  }

  ngOnDestroy() {
    this._subscriptions.forEach(x => x.unsubscribe());
  }
}
