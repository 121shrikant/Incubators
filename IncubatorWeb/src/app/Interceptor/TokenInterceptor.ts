import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SharedService } from '../Services/shared.service';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    private _token: any;
    constructor(private _sharedService: SharedService) {
        this._token = null;
        this._sharedService.currentUserSubject.subscribe(userDetails => {
            const tokDetails = localStorage.getItem('currentUser');
            if (userDetails.authdata != null) {
                this._token = userDetails.authdata;
            } else if (tokDetails != null) {
                this._token = JSON.parse(tokDetails).authdata;
            }
        });
    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = request.clone({
            setHeaders: {
                Authorization: 'Basic  ' +  this._token,
                ContentType: 'application/json'
            },
            url: environment.url + request.url
        });

        return next.handle(request);
    }
}
