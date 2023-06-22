import { Component, Output, EventEmitter } from '@angular/core';
import { ChartConfiguration, ChartDataset, ChartType, DefaultDataPoint } from 'chart.js';

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

  showBarChart: boolean = true;
  barChartLegend: boolean = true;
  barChartLabel: string = 'Aantal gebruikers van api';
  barChartData: ChartConfiguration<'bar'>['data'];
  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
  };

  constructor(private apiService: ApiService, private errorService: ErrorService) {
    this.barChartData = new Object as ChartConfiguration<'bar'>['data'];
    this.barChartData.labels = new Array<string>
    this.barChartData.datasets = new Array<ChartDataset<"bar", number[]>>
  }

  ngOnInit(): void {
    this.getAggregate();
  }

  getAggregate(): void {
    this.apiService.apiRequest('aggregate')
    .subscribe(resp => {
        this.aggregate = this.makeAggregateObject(resp as [any, any, any[]]);
        this.createBarChart(this.aggregate);
        this.showBarChart = true;
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

  createBarChart(aggregate: AggregateInterface): void {
    this.barChartData.labels = this.createBarChartLabels(aggregate);
    this.barChartData.datasets.push(this.createBarChartData(aggregate));
  }

  createBarChartLabels(aggregate: AggregateInterface): Array<string> {
    let barchartlabels: Array<string> = new Array; 
    aggregate.array[2].forEach(use => {
      if(use.api == ''){
        barchartlabels.push('geen');
        return;
      }
      barchartlabels.push(use.api)
    });
    return barchartlabels;
  }

  createBarChartData(aggregate: AggregateInterface): ChartDataset<"bar", number[]> {
    let barchartdata: ChartDataset<"bar", number[]> = new Object as ChartDataset<"bar", number[]>;
    barchartdata.data = new Array<number>;
    aggregate.array[2].forEach(use => barchartdata.data.push(use.aantal));
    barchartdata.label = this.barChartLabel;
    return barchartdata;
  }
}
