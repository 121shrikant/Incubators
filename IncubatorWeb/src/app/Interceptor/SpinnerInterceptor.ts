import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { SpinnerService } from '../Services/spinner.service';
@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
    constructor(public spinnerService: SpinnerService) {

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.spinnerService.Show();
        return next.handle(req).pipe(
            finalize(() => this.spinnerService.Hide())
        );
    }
}
