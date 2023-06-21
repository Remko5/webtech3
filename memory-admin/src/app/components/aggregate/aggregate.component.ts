import { Component, Output, EventEmitter } from '@angular/core';

import { AggregateInterface } from 'src/app/interfaces/AggregateInterface';
import { ApiErrorInterface } from 'src/app/interfaces/ApiErrorInterface';

import { ApiService } from 'src/app/services/api-service.service';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-aggregate',
  templateUrl: './aggregate.component.html',
  styleUrls: ['./aggregate.component.css']
})
export class AggregateComponent {
  aggregate?: AggregateInterface;
  @Output() invalidToken = new EventEmitter<ApiErrorInterface>();

  constructor(private apiService: ApiService, private errorService: ErrorService) {}

  ngOnInit(): void {
    this.getAggregate();
  }

  getAggregate(): void {
    this.apiService.apiRequest('aggregate')
    .subscribe(resp => {
        this.aggregate = this.makeAggregateObject(resp as [any, any, any[]]);
        //console.log(this.aggregate.array.forEach(item => console.log(item)))
    }, error => {
      if(error.status == 401){
        this.invalidToken.emit(this.errorService.generateErrorObject(error));
      }
    });
  }

  makeAggregateObject(data: [any,any,any[]]): AggregateInterface {
    let aggregate: AggregateInterface = new Object as AggregateInterface
    aggregate.array = data
    return aggregate;
  }
}
