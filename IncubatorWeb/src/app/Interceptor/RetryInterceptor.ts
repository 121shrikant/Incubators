import { Injectable } from '@angular/core';
import {
     HttpEvent, HttpRequest, HttpHandler,
     HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { SharedService } from '../Services/shared.service';


@Injectable()
export class RetryInterceptor implements HttpInterceptor {
     constructor(public router: Router, private _sharedService: SharedService) {

     }
     intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
          return next.handle(request).pipe(
               retry(environment.retryCount),
               catchError((err: HttpErrorResponse) => {
                    console.log('500 status: ', err);
                    if (err.status === 401) {
                         this.router.navigate(['/unauthorized']);
                    } else {
                        alert('Network Error');
                    }
                    return throwError(err);
               })
          );
     }
}
