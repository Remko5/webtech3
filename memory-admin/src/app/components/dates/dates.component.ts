import { Component, Output, EventEmitter } from '@angular/core';

import { ApiErrorInterface } from 'src/app/interfaces/ApiErrorInterface';
import { DatesInterface, DateInterface } from 'src/app/interfaces/DatesInterface';

import { ApiService } from 'src/app/services/api-service.service';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-dates',
  templateUrl: './dates.component.html',
  styleUrls: ['./dates.component.css']
})
export class DatesComponent {
  dates?: DatesInterface;
  @Output() invalidToken = new EventEmitter<ApiErrorInterface>();

  constructor(private apiService: ApiService, private errorService: ErrorService) {}

  ngOnInit(): void {
    this.getDates();
  }

  getDates(): void {
      this.apiService.apiRequest('dates')
      .subscribe(resp => {
        this.dates = this.makeDatesObject(resp as Object);
      }, error => {
        if(error.status == 401){
          console.log("dates");
          this.invalidToken.emit(this.errorService.generateErrorObject(error));
        }
      });
  }

  makeDatesObject(data: Object): DatesInterface {
    let dates: DatesInterface = new Object as DatesInterface;
    let date:Array<string> = Object.keys(data);
    let amountPlayed: Array<number> = Object.values(data);
    dates.array = new Array(date.length - 1);
    for (let i = 0; i < date.length; i++) {
      let temp: DateInterface = new Object as DateInterface
      temp.date = date[i];
      temp.amountPlayed = amountPlayed[i];
      dates.array.push(temp);
    }
    return dates;
  }
}
