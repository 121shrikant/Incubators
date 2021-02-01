import { Component, OnInit } from '@angular/core';
import { SpinnerService } from '../Services/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {

  showSpinner = false;

  constructor(private spinnerService: SpinnerService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.spinnerService.isSpinning.subscribe(val => {
        this.showSpinner = val;
      });
    }, 0);
  }

}
