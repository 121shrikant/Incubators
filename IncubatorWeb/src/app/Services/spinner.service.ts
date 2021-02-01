import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class SpinnerService {
    private _spinningCounter = 0;

    isSpinning = new BehaviorSubject(false);
    currentStatus = this.isSpinning.asObservable();

    Show() {
        this._spinningCounter++;
        this.isSpinning.next(this._spinningCounter > 0);
    }

    Hide() {
        this._spinningCounter--;
        this.isSpinning.next(!(this._spinningCounter === 0));
    }
}
